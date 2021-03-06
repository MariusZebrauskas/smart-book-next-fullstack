require('dotenv').config();

module.exports = {
  env: {
    MONGO_URI: process.env.MONGO_URI,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    EMAIL_NAME: process.env.EMAIL_NAME,
    EMAIL_PASS: process.env.EMAIL_PASS,
  },
};
