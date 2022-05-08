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
    image: '/2.jpg',

    alt: 'Todo list image',
    page: 'dashboard/todo',
  },
  {
    id: 2,
    name: 'Routine',
    image: '/1.jpg',
    alt: 'Routine image',
    page: 'dashboard/routine',
  },
];
