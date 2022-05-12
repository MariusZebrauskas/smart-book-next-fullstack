type Card = {
  id: number;
  name: string;
  image: string;
  alt: string;
  page: string;
}[];

export const dashbordCards: Card = [
  {
    id: 1,
    name: 'TODO LIST',
    image:
      'https://firebasestorage.googleapis.com/v0/b/smart-book-ce0de.appspot.com/o/1.jpg?alt=media&token=8a786f2a-1939-4441-a640-e23497fb09aa',

    alt: 'Todo list image',
    page: 'dashboard/todo',
  },
  {
    id: 2,
    name: 'Routine',
    image:
      'https://firebasestorage.googleapis.com/v0/b/smart-book-ce0de.appspot.com/o/2.jpg?alt=media&token=1c2a8060-dab4-4965-bef4-b86dd3ee651c',
    alt: 'Routine image',
    page: 'dashboard/routine',
  },
];
