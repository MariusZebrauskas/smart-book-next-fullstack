import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-gray-800 mt-20'>
      <div className='container px-6 py-8 mx-auto'>
        <div className='text-center'>
          <a
            href='#'
            className='text-2xl font-bold text-white hover:text-gray-300'
          >
            Smart Book
          </a>

          <p className='max-w-md mx-auto mt-2 text-gray-400'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>

         
        </div>

        <hr className='my-10 border-gray-700' />

        <div className='flex flex-col items-center sm:flex-row sm:justify-between'>
          <p className='text-sm text-gray-400'>© Copyright 2021. All Rights Reserved.</p>

          <div className='flex mt-3 -mx-2 sm:mt-0'>
            <a
              href='#'
              className='mx-2 text-sm text-gray-400  hover:text-gray-300'
              aria-label='Reddit'
            >
              {' '}
              Teams{' '}
            </a>

            <a
              href='#'
              className='mx-2 text-sm text-gray-400 hover:text-gray-500 dark:hover:text-gray-300'
              aria-label='Reddit'
            >
              {' '}
              Privacy{' '}
            </a>

            <a
              href='#'
              className='mx-2 text-sm text-gray-400 hover:text-gray-500 dark:hover:text-gray-300'
              aria-label='Reddit'
            >
              {' '}
              Cookies{' '}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
