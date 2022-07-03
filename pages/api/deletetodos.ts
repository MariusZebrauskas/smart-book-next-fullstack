const TodoList = require('../../models/todo');
const jwt = require('jsonwebtoken');

import dbConnect from '../../utils/dbconnections';

dbConnect();

export default async (req: any, res: any) => {
  // declear token
  let token = req.body.token;
  const { method } = req;

  if (!token) return res.status(401).send('Access Denied');
  if (method !== "POST") return res.status(401).send('Route Protection');

  // verify token
  try {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err: any, decoded: any) => {
      if (err) {
        return res.status(400).send('error, invalid token');
      }
      // decoded usert id
      let id = decoded._id;

      // get list
      let list = await TodoList.findById({ _id: id });
      if (!list)
        return res.status(400).json({ message: 'you can add only to your list', error: true });

      // variable to do filtering
      let objId = req.body.objToDelete.id;
      try {
        // filter
        let newList = await list.todos.filter((li: any) => li.id !== objId);

        // update
        list.todos = [...newList];
        // save
        list.save();

        res.json({ success: true, message: 'delte todo', list: list, error: false });
      } catch (err) {}
    });
  } catch (err) {
    return res.status(400).send('Invalid token');
  }
};
