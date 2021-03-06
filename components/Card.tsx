import Link from 'next/link';
import React from 'react';

const Card = () => {
  return (
    <section className='animationCards bg-gray-100   lg:py-12 lg:flex lg:justify-center mt-20'>
      <div className='bg-white  lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg'>
        <div className='lg:w-1/2'>
          <div
            className='h-64 bg-cover lg:rounded-lg lg:h-full'
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80')",
            }}
          ></div>
        </div>

        <div className='max-w-xl px-6 py-12 lg:max-w-5xl lg:w-1/2'>
          <h2 className='text-2xl font-bold text-gray-800  md:text-3xl'>
          Everything  in one <span className='text-blue-600 '>application</span>
          </h2>
          <p className='mt-4 text-gray-600 '>
          Create one account and get 2 applications for free. 
          These applications help time planning and organizing and also track your plans,
           it is very easy to use the Smartbook, 
          you can track, add, edit, and delete your tasks from any device in seconds.
          </p>

          <div className='mt-8'>
            <Link href='/dashboard'>
              <a
                href='#'
                className='px-5 py-2 font-semibold text-gray-100 transition-colors duration-200 transform
              bg-gray-900 rounded-md hover:bg-gray-700'
              >
                Start Now
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
