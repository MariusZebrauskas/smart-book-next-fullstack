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
    name: 'TO-DO LIST',

    image:
      'https://firebasestorage.googleapis.com/v0/b/smart-book-ce0de.appspot.com/o/2.croped.jpg?alt=media&token=dfaa9613-6a82-4dbe-9cf8-7a5adc6158c7',
    alt: 'Todo list image',
    page: 'dashboard/todo',
  },
  {
    id: 2,
    name: 'Routine',
    image:
      'https://firebasestorage.googleapis.com/v0/b/smart-book-ce0de.appspot.com/o/7-days-300x300%20resized.jpg?alt=media&token=6c5ec4c8-4dae-4d2f-b09c-18ecb0c37232',
    alt: 'Routine image',
    page: 'dashboard/routine',
  }
];
