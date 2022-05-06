import Link from 'next/link';
import React, { useEffect } from 'react';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import { unknownPage } from '../redux/pageReducer';
import { closeSubmenu } from '../redux/submenuReducer';

interface T extends DefaultRootState {
  submenu: boolean;
}

const unknowPage = () => {
  // redux variables
  const dispatch = useDispatch();
  const submenu = useSelector<T>((store) => store.submenu);

  // set homepage varaibles
  useEffect(() => {
    dispatch(unknownPage());
  }, []);

  // close sub menu on mouse leave menu
  const onMouseEnter = () => {
    if (submenu) {
      dispatch(closeSubmenu());
    }
  };
  
  return (
    <div onMouseEnter={onMouseEnter} className='flex items-center justify-center w-screen h-screen'>
      <div className='px-4 lg:py-12'>
        <div className='lg:gap-4 lg:flex'>
          <div className='flex flex-col items-center justify-center md:py-24 lg:py-32'>
            <h1 className='font-bold text-blue-600 text-9xl'>404</h1>
            <p className='mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl'>
              <span className='text-red-500'>Oops!</span> Page not found
            </p>
            <p className='mb-8 text-center text-gray-500 md:text-lg'>
              The page you’re looking for doesn’t exist.
            </p>
            <Link href='/'>
              <a className='px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100'>Go home</a>
            </Link>
          </div>
          <div className='mt-4'>
            <img
              src='https://cdn.pixabay.com/photo/2016/11/22/23/13/black-dog-1851106__340.jpg'
              alt='img'
              className='object-cover w-full h-full'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default unknowPage;
