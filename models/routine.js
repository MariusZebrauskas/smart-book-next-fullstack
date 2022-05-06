const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating schema

const routineList = new Schema({
  _id: {
    type: String,
    required: true,
  },
  sevenDays: [],
});

// creating model

// const Routine = mongoose.model('Routine', routineList);

// export

// module.exports = Routine;

module.exports = mongoose.models.Routine || mongoose.model('Routine', routineList);


