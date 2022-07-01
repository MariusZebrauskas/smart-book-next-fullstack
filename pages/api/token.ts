import { NextRequest, NextResponse } from 'next/server';
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

export default async (req: any, res: any) => {
  const { token } = req.body;

  //   console.log('req:', req.body);
  //   console.log(req.method);
  if (req.method === 'POST' && token) {
    jwt.verify(token, process.env.TOKEN_SECRET, function (err: any, decoded: any) {
      if (err) {
        return console.log(err.message);
      }
      //   validating token and getting id;
      const id = decoded._id;
      console.log('id:', id);

      //   chek DB for same email!
      User.findOne({ _id: decoded._id }, (err: any, userFromDb: any) => {
        if (!userFromDb) {
          return res
            .status(200)
            .json({ message: 'sorry person do not egsist', userExists: false, login: false });
        } else if (userFromDb) {
          // when user is found need to compare password vs bcrypt pass
          /* user data */
          let hash = userFromDb.password;
          const { _id, userName, email } = userFromDb;
          const user = { userName, email };

          const token = jwt.sign({ _id: _id }, process.env.TOKEN_SECRET, { expiresIn: '7d' });
          return (
            res
              .status(200)
              // .header('auth-token', token)
              .json({ user, token, message: 'you are logged in', success: true })
          );
        } else {
          res.status(200).json({ success: false, err });
        }
      });
    });
  }

  try {
  } catch {
    console.log('error something went wrong');
  }
};
