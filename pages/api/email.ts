export default async (req: any, res: any) => {
  let data = req.body;
  console.log('data:', data);
  res.status(200).json({ success: true, data});
};
