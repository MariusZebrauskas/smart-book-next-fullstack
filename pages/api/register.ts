import User from '../../models/user';
import TodoList from '../../models/todo';
import Routine from '../../models/routine';
const bcrypt = require('bcrypt');
import { registerValidation } from '../../utils/validation';
import { sevenDays } from '../../utils/obj';
const saltRounds = 10;
import dbConnect from '../../utils/dbconnections';

dbConnect();

export default async (req: any, res: any) => {
  const { method } = req;
  console.log(req.url);
  console.log('method:', method);

  if (method === 'POST') {
    // unhashed password
    const myPlaintextPassword = req.body.password;

    // VALIDATING DATA

    const { error } = registerValidation(req.body);

    if (error) return res.status(400).json({ error: 'Data invalid' });

    //   CHECK DB FOR SAME EMAIL!
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
      return res.status(200).json({ message: 'Sorry email is allready in use', userExists: true });

    try {
      //   1.use bcrypt function to bcrypt password
      //   2. save and send new user with hashed pass to DB

      bcrypt.genSalt(saltRounds, function (err: any, salt: any) {
        bcrypt.hash(myPlaintextPassword, salt, function (err: any, hash: any) {
          // create user using schema with hased password
          const user = new User({
            userName: req.body.userName,
            password: hash,
            email: req.body.email,
          });
          // save and send to db new USER
          user
            .save()
            .then((results: any) => {
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

              res
                .status(200)
                .json({
                  message: 'Account has been created successfully',
                  userExists: false,
                  user,
                });
            })
            .catch((err: any) => {
              res.status(404).json({ error: err });
            });
        });
      });
    } catch (err) {
      res.status(400).send(err);
    }
  }
};
