type Card = {
  id: number;
  name: string;
  image: string;
  alt: string;
  page: string;
}[];

export const dashbordCards: Card = [
  {
    id: 2,
    name: 'Routine',
    image:
      'https://firebasestorage.googleapis.com/v0/b/smart-book-ce0de.appspot.com/o/1-%20cropped.jpg?alt=media&token=1769de4c-5eb0-415b-955a-d7dc13048e26',
    alt: 'Routine image',
    page: 'dashboard/routine',
  },
  {
    id: 1,
    name: 'TODO LIST',

    image:
      'https://firebasestorage.googleapis.com/v0/b/smart-book-ce0de.appspot.com/o/2.croped.jpg?alt=media&token=dfaa9613-6a82-4dbe-9cf8-7a5adc6158c7',
    alt: 'Todo list image',
    page: 'dashboard/todo',
  },
];
