import React from 'react';

const Header = () => {
  return (
    <section className='bg-gray-900'>
      <div className='container flex flex-col items-center px-4 py-12 mx-auto text-center'>
        <h2 className='text-3xl font-bold tracking-tight text-white'>
          Add your todos to database and access from any devise you want!
        </h2>

        <p className='block max-w-2xl mt-4 text-xl text-gray-500 dark:text-gray-300'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto recusandae tenetur iste
          quaerat voluptatibus quibusdam nam repudiandae{' '}
        </p>
      </div>
    </section>
  );
};

export default Header;
