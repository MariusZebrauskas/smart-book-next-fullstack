const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating schema

const user = new Schema(
  {
    userName: {
      type: String,
      required: true,
      min: 3,
      max: 250,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 250,
    },
    email: {
      type: String,
      required: true,
      max: 250,
    },
  },
  {
    timestamps: true,
  }
);

// creating model

// const User = mongoose.model('User', user);


// export

// module.exports = User;

module.exports = mongoose.models.User || mongoose.model('User', user);