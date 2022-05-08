import React from 'react';

const TwoCards = () => {
  return (
    <section className='bg-white dark:bg-gray-900'>
      <div className='container grid grid-cols-1 gap-8 px-4 py-12 mx-auto lg:grid-cols-2'>
        <div className='flex flex-col items-center max-w-lg mx-auto text-center'>
          <h2 className='text-3xl font-semibold tracking-tight text-gray-800 dark:text-white'>
            Routine calendar
          </h2>

          <p className='mt-3 text-gray-500 dark:text-gray-300'>
            Routine has been designed and built to track weekly tasks, like when to pick up your
            child from after school club, or any kind of tasks you do weekly but sometime you forget
            todo.
          </p>

          <a
            href='#'
            className='inline-flex items-center justify-center w-full px-5 py-2 mt-6 text-white bg-blue-600 rounded-lg sm:w-auto hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80'
          >
            Start tracing now
          </a>
        </div>

        <div className='flex flex-col items-center max-w-lg mx-auto text-center'>
          <h2 className='text-3xl font-semibold tracking-tight text-gray-800 dark:text-white'>
            Todo list
          </h2>

          <p className='mt-3 text-gray-500 dark:text-gray-300'>
            It's a list of tasks you need to complete or things that you want to do. Most typically,
            they're organised in order of priority. Traditionally, they're written on a piece of
            paper or post it notes and act as a memory aid.
          </p>

          <a
            href='#'
            className='inline-flex items-center justify-center w-full px-5 py-2 mt-6 text-gray-700 transition-colors duration-150 transform bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-100 dark:text-white sm:w-auto dark:hover:bg-gray-800 dark:ring-gray-700 focus:ring focus:ring-gray-200 focus:ring-opacity-80'
          >
            Create todo list
          </a>
        </div>
      </div>
    </section>
  );
};

export default TwoCards;
