import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import { dashboardPage } from '../redux/pageReducer';

type Card = {
  card: {
    id: number;
    name: string;
    image: string;
    alt: string;
    page: string;
  };
};

interface T extends DefaultRootState {
  user: null | any;
  page: string;
}

const DynamicCards: React.FC<Card> = ({ card }) => {
  const user: any = useSelector<T>((state) => state.user);
  const dispach = useDispatch();

  useEffect(() => {
    dispach(dashboardPage());
  }, []);

  return (
    <Link key={card.id} href={user ? card.page : '/login'}>
      <div
        className='
        animationCards
        max-w-xs mx-auto overflow-hidden bg-gray-200 rounded-lg shadow-lg
         dark:bg-gray-800
        hover:cursor-pointer
        flex justify-center flex-col 
        '
      >
        <div className='flex flex-center justify-center py-2'>
          <h1
            className='text-lg sm:text-2xl font-bold text-gray-800 uppercase 
          dark:text-white'
          >
            {card.name}
          </h1>
        </div>
        <img priority className='rounded-b-lg' src={card.image} alt={card.alt} width='200'  />
      </div>
    </Link>
  );
};

export default DynamicCards;
