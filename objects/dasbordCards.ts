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
      'https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    alt: 'Todo list image',
    page: 'dashboard/todo',
  },
  {
    id: 2,
    name: 'Routine',
    image:
      'https://images.unsplash.com/photo-1633526543814-9718c8922b7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: 'Routine image',
    page: 'dashboard/routine',
  },
];
