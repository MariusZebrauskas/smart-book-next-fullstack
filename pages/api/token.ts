import { NextRequest, NextResponse } from 'next/server';
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

import dbConnect from '../../utils/dbconnections';

dbConnect();

export default async (req: any, res: any) => {
  const { token } = req.body;

  if (req.method === 'POST' && token) {
    jwt.verify(token, process.env.TOKEN_SECRET, function (err: any, decoded: any) {
      if (err) {
        return res.status(200).json({
          success: false,
          error: err,
          message: 'jwt verify error',
        });
      }
      //   validating token and getting id;
      const { _id } = decoded;

      //   chek DB for same email!
      if (_id) {
        User.findOne({ _id }, (err: any, userFromDb: any) => {

          if (!userFromDb) {
            return res
              .status(200)
              .json({ message: 'sorry person do not egsist', userExists: false, login: false });
          } else if (userFromDb) {

            const { _id, userName, email } = userFromDb;
            const user = { userName, email };
            return (
              res
                .status(200)
                // .header('auth-token', token)
                .json({ user, message: 'you are logged in', success: true })
            );
          } else {
            res.status(200).json({ success: false, err });
          }
        });
      }
    });
  }

  try {
  } catch (err: any) {
    return res.status(200).json({
      success: false,
      error: err,
      message: 'main error',
    });
  }
};
