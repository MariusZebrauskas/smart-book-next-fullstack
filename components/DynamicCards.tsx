import Link from 'next/link';
import React from 'react';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';



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
}

const DynamicCards: React.FC<Card> = ({ card }) => {
  const user: any = useSelector<T>((state) => state.user);
  const dispach = useDispatch();
 



  // FIXME: todo + calendar json toekn verify  + functionality to add delete update !!!! DB
  // FIXME: todo + calendar json toekn verify  + functionality to add delete update !!!! DB
  // FIXME: todo + calendar json toekn verify  + functionality to add delete update !!!! DB
  // FIXME: todo + calendar json toekn verify  + functionality to add delete update !!!! DB

  return (
    <Link key={card.id} href={user ? card.page : '/login'}>
      <div
        className='max-w-xs mx-auto overflow-hidden bg-gray-200 rounded-lg shadow-lg dark:bg-gray-800
      hover:cursor-pointer
        '
      >
        <div className='px-4 py-2'>
          <h1 className='text-lg sm:text-2xl font-bold text-gray-800 uppercase dark:text-white'>
            {card.name}
          </h1>
        </div>
        <img className='imageForDashboard' src={card.image} alt={card.alt} />
      </div>
    </Link>
  );
};

export default DynamicCards;
