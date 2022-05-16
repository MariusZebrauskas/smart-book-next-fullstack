import React from 'react';
import { DefaultRootState, useSelector } from 'react-redux';

interface T extends DefaultRootState {
  page: string;
}
const date = new Date();
const Footer = () => {
  const page = useSelector<T>((state) => state.page);
  console.log('page from footer:', page);

  return (
    <footer
      className={
        page === 'dashboard'
          ? 'footerMarginDashboard bg-gray-800 '
          : page === 'contact' || page === 'unknown'
          ? 'footerMarginContact bg-gray-800 '
          : 'bg-gray-800 mt-20'
      }
    >
      <div className='container px-6 py-8 mx-auto fotterWithOnUltraWide'>
        <div className='text-center'>
          <a href='#' className='text-2xl font-bold text-white hover:text-gray-300'>
            SmartBook
          </a>

          <p className='max-w-md mx-auto mt-2 text-gray-400'>
            Easy to use to-do and routine application.
          </p>
        </div>

        <hr className='my-10 border-gray-700' />

        <div className='flex flex-col items-center sm:flex-row sm:justify-between'>
          <p className='text-sm text-gray-400'>© Copyright 2021 - {date.getFullYear()}. All Rights Reserved.</p>

     
        </div>
      </div>
    </footer>
  );
};

export default Footer;
