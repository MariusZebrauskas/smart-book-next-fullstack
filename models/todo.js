const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating schema

const todoList = new Schema({
  _id: {
    type: String,
    required: true,
  },
  todos: [],
});

// creating model

// const TodoList = mongoose.model('TodoList', todoList);

// export

// module.exports = TodoList;

module.exports = mongoose.models.TodoList || mongoose.model('TodoList', todoList);