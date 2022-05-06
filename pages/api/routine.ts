const jwt = require('jsonwebtoken');
const Routine = require('../../models/routine');

export default async (req: any, res: any) => {
  const { method } = req;

  // declear token
  let token = req.body.token;

  if (!token) return res.status(401).send('Access Denied');
  if (method !== 'POST') return res.status(401).send('Route Protection');
  // verify token
  const { _id } = jwt.verify(token, process.env.TOKEN_SECRET);
  if (!_id) return res.status(400).send('Invalid token');
  //   get routine
  let routine = await Routine.findById({ _id: _id });
  //   if not legit id
  if (!routine)
    return res.status(400).json({ message: 'you can wiew only your routine', error: true });

  // send routine
  res
    .status(200)
    .json({ success: true, message: 'private todo', routine: routine.sevenDays, error: false });
};
