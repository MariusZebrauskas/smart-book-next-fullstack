import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import TwoCards from '../components/TwoCards';
import { homePage } from '../redux/pageReducer';
import { useEffect } from 'react';
import { closeSubmenu } from '../redux/submenuReducer';
import { closeMenu } from '../redux/menuRedux';

interface T extends DefaultRootState {
  submenu: boolean;
}

const IndexPage = () => {
  // redux variables
  const dispatch = useDispatch();
  const submenu = useSelector<T>((store) => store.submenu);

  useEffect(() => {
    // set homepage varaibles
    dispatch(homePage());
    if (submenu) {
      dispatch(closeSubmenu());
    }
  }, []);

  // close sub menu on mouse leave menu
  const onMouseEnter = () => {
    if (submenu) {
      dispatch(closeSubmenu());
    }
  };

  return (
    <header onMouseEnter={onMouseEnter} className='bg-white dark:bg-gray-800 mt-20 relative'>
      <div
        className='container flex flex-col px-6 py-10 mx-auto space-y-6 
      lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center'
      >
        <div className='w-full lg:w-1/2  '>
          <div className='lg:max-w-lg'>
            <h1
              className='text-2xl font-medium tracking-wide text-gray-800 dark:text-white
             lg:text-4xl'
            >
              Build your routine and todos online in one flexible software.
            </h1>
            <p className='mt-2 text-gray-600 dark:text-gray-300'>
              Plan, manage and track all your tasks or routine in one flexible software. 
            </p>
            <div className='grid gap-6 mt-8 sm:grid-cols-2'>
              <div className='flex items-center text-gray-800 -px-3 dark:text-gray-200'>
                <svg
                  className='w-5 h-5 mx-3'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 13l4 4L19 7'
                  />
                </svg>

                <span className='mx-3'>Routine callendar</span>
              </div>

              <div className='flex items-center text-gray-800 -px-3 dark:text-gray-200'>
                <svg
                  className='w-5 h-5 mx-3'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 13l4 4L19 7'
                  />
                </svg>

                <span className='mx-3'>Todo list</span>
              </div>

              <div className='flex items-center text-gray-800 -px-3 dark:text-gray-200'>
                <svg
                  className='w-5 h-5 mx-3'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 13l4 4L19 7'
                  />
                </svg>

                <span className='mx-3'>All devices</span>
              </div>

              <div className='flex items-center text-gray-800 -px-3 dark:text-gray-200'>
                <svg
                  className='w-5 h-5 mx-3'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 13l4 4L19 7'
                  />
                </svg>

                <span className='mx-3'>No paiments</span>
              </div>

              <div className='flex items-center text-gray-800 -px-3 dark:text-gray-200'>
                <svg
                  className='w-5 h-5 mx-3'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 13l4 4L19 7'
                  />
                </svg>

                <span className='mx-3'>Data security for free</span>
              </div>

              <div className='flex items-center text-gray-800 -px-3 dark:text-gray-200'>
                <svg
                  className='w-5 h-5 mx-3'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 13l4 4L19 7'
                  />
                </svg>

                <span className='mx-3'>Extreamly fast</span>
              </div>
              <div className='flex items-center text-gray-800 -px-3 dark:text-gray-200'>
                <svg
                  className='w-5 h-5 mx-3'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 13l4 4L19 7'
                  />
                </svg>

                <span className='mx-3'>Easy to use</span>
              </div>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-center w-full h-96 lg:w-1/2'>
          <img
            className='object-cover w-full h-full max-w-2xl rounded-md'
            src='https://images.unsplash.com/photo-1555181126-cf46a03827c0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
            alt='glasses photo'
          />
        </div>
      </div>
      <TwoCards />
      <Card />
    </header>
  );
};

export default IndexPage;
