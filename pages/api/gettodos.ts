const TodoList = require('../../models/todo');
const jwt = require('jsonwebtoken');

export default async (req: any, res: any) => {
  const { method } = req;

  // declear token
  let token = req.body.token;

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

      res.json({ success: true, message: 'private todo', list: list.todos, error: false });
    });
  } catch (err) {
    return res.status(400).send('Invalid token');
  }
};
