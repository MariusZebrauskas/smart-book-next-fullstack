import React from 'react';

const Card = () => {
  return (
    <section className='bg-gray-100  dark:bg-gray-900 lg:py-12 lg:flex lg:justify-center mt-20'>
      <div className='bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg'>
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
          <h2 className='text-2xl font-bold text-gray-800 dark:text-white md:text-3xl'>
            Build Your New <span className='text-blue-600 dark:text-blue-400'>Idea</span>
          </h2>
          <p className='mt-4 text-gray-600 dark:text-gray-400'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem modi reprehenderit
            vitae exercitationem aliquid dolores ullam temporibus enim expedita aperiam mollitia
            iure consectetur dicta tenetur, porro consequuntur saepe accusantium consequatur.
          </p>

          <div className='mt-8'>
            <a
              href='#'
              className='px-5 py-2 font-semibold text-gray-100 transition-colors duration-200 transform
               bg-gray-900 rounded-md hover:bg-gray-700'
            >
              Start Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
