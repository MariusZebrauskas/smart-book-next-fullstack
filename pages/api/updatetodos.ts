const TodoList = require('../../models/todo');
const jwt = require('jsonwebtoken');

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

      // variables to do filtering
      let dataFromClientToUpdate = req.body.edite;

      try {
        // update todo
        list.todos[dataFromClientToUpdate.id].text = dataFromClientToUpdate.editeText;
        // save and set update to db
        await TodoList.findByIdAndUpdate(
          { _id: id },
          {
            $set: { todos: list.todos },
          },
          {
            new: true,
          }
        );
        // console.log('list.todos:', list.todos);

        res.json({ success: true, message: 'update todo', error: false });
      } catch (err) {
        console.log('err:', err);
      }
    });
  } catch (err) {
    return res.status(400).send('Invalid token');
  }
};
