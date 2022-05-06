import gsap from 'gsap';
import React, { useEffect } from 'react';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import { contactPage } from '../redux/pageReducer';
import { closeSubmenu } from '../redux/submenuReducer';

interface T extends DefaultRootState {
  submenu: boolean;
}

const contact = () => {
  const dispatch = useDispatch();
  const submenu = useSelector<T>((store) => store.submenu);

  // on page load
  useEffect(() => {
    // set page
    dispatch(contactPage());
    // close sub menu
    if (submenu) {
      console.log('shlud close');
      dispatch(closeSubmenu());
    }
  }, []);
  // close sub menu animation opne close
  useEffect(() => {
    if (!submenu) {
      gsap.fromTo(
        '.submenuGSAP',
        {
          zIndex: -1,
        },
        {
          y: '-15rem',
          duration: 0.2,
          opacity: 0,
          display: 'none',
          zIndex: -1,
        }
      );
    } else if (submenu) {
      gsap.fromTo(
        '.submenuGSAP',
        {
          y: 0,
          opacity: 1,
          display: 'block',
          zIndex: -1,
        },
        { zIndex: 5, duration: 0.3 }
      );
    }
  }, [submenu]);

  // close sub menu on mouse leave menu
  const onMouseEnter = () => {
    if (submenu) {
      dispatch(closeSubmenu());
    }
  };

  return (
    <section
      onMouseEnter={onMouseEnter}
      className='w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-20 relative'
    >
      <h2 className='text-3xl font-semibold text-center text-gray-800 dark:text-white'>
        Get in touch
      </h2>
      <p className='mt-10 text-center text-gray-600 dark:text-gray-400'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      </p>

      <div className='mt-10 '>
        <div className='items-center -mx-2 md:flex'>
          <div className='w-full mx-2'>
            <label className='block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200'>
              Name
            </label>

            <input
              className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
              type='text'
            />
          </div>

          <div className='w-full mx-2 mt-4 md:mt-0'>
            <label className='block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200'>
              E-mail
            </label>

            <input
              className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
              type='email'
            />
          </div>
        </div>

        <div className='w-full mt-4'>
          <label className='block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200'>
            Message
          </label>

          <textarea className='block w-full h-40 px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40'></textarea>
        </div>

        <div className='flex justify-center mt-6'>
          <button className='px-4 py-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
            Send Message
          </button>
        </div>
      </div>
    </section>
  );
};

export default contact;
