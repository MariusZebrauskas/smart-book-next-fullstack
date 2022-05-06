import React from 'react';

const RoutineHeader = () => {
  return (
    <section className='bg-gray-900'>
      <div className='container px-6 py-16 mx-auto text-center'>
        <div className='max-w-lg mx-auto'>
          <h1 className='text-3xl font-bold text-white md:text-4xl'>
            Add your routine to this calendar and never ever forget your tasks
          </h1>

          <h4 className='mt-6 text-gray-300'>
            This scedual helps people to focus on their dayly tasks rather than keep geting
            distracted of thinkig what shuld I do next now!
          </h4>
        </div>
      </div>
    </section>
  );
};

export default RoutineHeader;
