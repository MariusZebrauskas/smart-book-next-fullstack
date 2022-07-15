const dashbordCards = [
  {
    id: 1,
    name: 'TO-DO LIST',

    image:
      'https://firebasestorage.googleapis.com/v0/b/smart-book-ce0de.appspot.com/o/2.croped.jpg?alt=media&token=dfaa9613-6a82-4dbe-9cf8-7a5adc6158c7',
    alt: 'Todo list image',
    page: 'dashboard/todo',
  },
  {
    id: 2,
    name: 'Weekly To Do List',
    image:
      'https://firebasestorage.googleapis.com/v0/b/smart-book-ce0de.appspot.com/o/7-days-300x300%20resized.jpg?alt=media&token=6c5ec4c8-4dae-4d2f-b09c-18ecb0c37232',
    alt: 'Weekly To Do List',
    page: 'dashboard/routine',
  },
];


export default async (req: any, res: any) => {
  res.send({ success: true, data: dashbordCards });
};
