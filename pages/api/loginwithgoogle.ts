const User = require('../../models/user');
const bcrypt = require('bcrypt');
const { loginValidation } = require('../../utils/validation');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

import TodoList from '../../models/todo';
import Routine from '../../models/routine';

import { registerValidation } from '../../utils/validation';
import { sevenDays } from '../../utils/obj';

import dbConnect from '../../utils/dbconnections';

dbConnect();

export default async (req: any, res: any) => {

  //   chek DB for same email!
  const chekEmailInDB = User.findOne({ email: req.body.email }, (err: any, userFromDb: any) => {
    if (!userFromDb) {
      const myPlaintextPassword = req.body.password;
      bcrypt.genSalt(saltRounds, function (err: any, salt: any) {

        bcrypt.hash(myPlaintextPassword, salt, function (err: any, hash: any) {

          // create user using schema with hased password
          const user = new User({
            userName: req.body.userName,
            password: hash,
            email: req.body.email,
          });
          // save and send to db new USER

          console.log('user before save:', user);
          user
            .save()
            .then((results: any) => {
              console.log('results after save:', results);
              // create todo list
              const todoList = new TodoList({
                _id: results._id,
              });

              todoList.save();
              // create routine list
              const routine = new Routine({
                _id: results._id,
              });
              // add routine object three
              routine.sevenDays.push(sevenDays);
              // save routine
              routine.save();
              const { _id, userName, email } = results;
              const token = jwt.sign({ _id: _id }, process.env.TOKEN_SECRET, { expiresIn: '7d' });
              const createdUser = { userName, email };

              res.status(200).json({
                message: 'Google account registered',
                userExists: false,
                token,
                user: createdUser,
              });
            })
            .catch((err: any) => {
              res.status(404).json({ error: err });
            });
        });
      });

    } else if (userFromDb) {


      const { _id, userName, email } = userFromDb;
      const user = { userName, email };

      const token = jwt.sign({ _id: _id }, process.env.TOKEN_SECRET, { expiresIn: '7d' });
      return res.status(200).json({
        user,
        token,
        message: 'you are logged in with google',
        success: true,
        googleLogin: true,
        login: true,
      });
    } else {
      res.status(200).json({ success: false, err });
    }
  });
};
