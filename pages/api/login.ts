

const User = require('../../models/user');
const bcrypt = require('bcrypt');
const { loginValidation } = require('../../utils/validation');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

import dbConnect from '../../utils/dbconnections';

dbConnect();

export default async (req: any, res: any) => {
    // unhashed password
    const myPlaintextPassword = req.body.password;
    
    //   Validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

  
  //   chek DB for same email!
  const chekEmailInDB = User.findOne({ email: req.body.email }, (err:any, userFromDb:any) => {
    if (!userFromDb) {
      return res
        .status(200)
        .json({ message: 'sorry email or password is invalid', userExists: false, login: false });
    } else if (userFromDb) {
      // when user is found need to compare password vs bcrypt pass
      /* user data */
      let hash = userFromDb.password;
      const { _id, userName, email } = userFromDb;
      const user = { userName, email };

      bcrypt.compare(myPlaintextPassword, hash, function (err:any, result:any) {
        if (result) {
          // if password  is correct before login
          // create JTW token, and asign it to user

          const token = jwt.sign({ _id: _id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
          return res
            .status(200)
            // .header('auth-token', token)
            .json({ user, token, message: 'you are logged in', success: true });
        } else {
          // if password is incorect return unauthorized
          return res
            .status(200)
            .json({ success: false, message: 'you are not authorized to access', login: false });
        }
      });
    } else {
        res.status(200).json({ success: false, err });
    }
});

}