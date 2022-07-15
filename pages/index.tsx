import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import TwoCards from '../components/TwoCards';
import { homePage } from '../redux/pageReducer';
import { useEffect } from 'react';
import { closeSubmenu } from '../redux/submenuReducer';
import { closeMenu } from '../redux/menuRedux';
import gsap from 'gsap';
import Head from 'next/head';
import axios from 'axios';
import { HTTP } from '../config';
import { userLogin } from '../redux/userReducer';
import useFetch from '../customHooks/useFetch';

interface T extends DefaultRootState {
  submenu: boolean;
  menu: boolean;
  user: any;
}

const IndexPage = () => {
  // redux variables
  const dispatch = useDispatch();
  const submenu = useSelector<T>((store) => store.submenu);
  const menu = useSelector<T>((store) => store.menu);
  const user = useSelector<T>((store) => store.user);

  const { loginHook } = useFetch();

  useEffect(() => {
    // set homepage varaibles
    dispatch(homePage());
    if (submenu) {
      dispatch(closeSubmenu());
    }
    if (menu) {
      dispatch(closeMenu());
    }
  }, []);

  // close sub menu & menu on mouse leave menu
  const onMouseEnter = () => {
    if (submenu) {
      dispatch(closeSubmenu());
    }
    if (menu) {
      dispatch(closeMenu());
    }
  };
  // animation homepage all
  var tl = gsap.timeline();
  useEffect(() => {
    tl.fromTo(
      '.animation',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.3 }
    )
      .fromTo(
        '.animationPic',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.3 },
        '"-=0.1"'
      )
      .fromTo(
        '.animationCards',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.3 },
        '"<-=.3>"'
      );
  }, []);

  // login with tokens

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      return;
    }
    if (user) {
      return;
    }
    if (!user && localStorage.getItem('token') !== null) {
      loginHook();
    }
  }, []);

  return (
    <main onMouseEnter={onMouseEnter} className='bg-white  mt-20 relative'>
      <Head>
        <title>Free Weekly To Do List </title>
        <meta
          name='description'
          content='Free weekly to do list. We give two types of to-do lists for free:  1) Weekly callendar type to-do list app. 2) List type to-do list. All in one flexible software, add todoist, things to do, todo list, add edit create and delte your todos for free'
        />
      </Head>
      <div
        className='container flex flex-col px-6 py-10 mx-auto space-y-6 
      lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center'
      >
        <div className='w-full lg:w-1/2  '>
          <div className='lg:max-w-lg'>
            <h1
              className='text-2xl font-medium tracking-wide 
              text-gray-800 
             lg:text-4xl animation
             px-8
             '
            >
              Free weekly to do list! Build your lists, organize your life and do not forget your
              tasks again.
            </h1>

            <div className='px-8 py-4 animation grid gap-6 mt-8 sm:grid-cols-2'>
              <div className='   flex items-center text-gray-800 -px-3 '>
                <svg
                  className='w-5 h-5 mx-3 '
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

                <span className='mx-3'>Weekly To Do List</span>
              </div>

              <div className=' flex items-center text-gray-800 -px-3 '>
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

              <div className=' flex items-center text-gray-800 -px-3 '>
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

              <div className='  flex items-center text-gray-800 -px-3 '>
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

                <span className='mx-3'>No payments</span>
              </div>

              <div className=' flex items-center text-gray-800 -px-3 '>
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

              <div className=' flex items-center text-gray-800 -px-3 '>
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

                <span className='mx-3'>Extremely fast</span>
              </div>
              <div className=' flex items-center text-gray-800 -px-3 '>
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

        <div className='flex animationPic items-center justify-center w-full h-96 lg:w-1/2'>
          <video
            className='object-cover w-full h-full max-w-2xl rounded-md'
            src='https://firebasestorage.googleapis.com/v0/b/smart-book-ce0de.appspot.com/o/video%2Fupdated.mp4?alt=media&token=275416a5-8e7e-4e05-ac9e-91366b016627'
            controls
          />
        </div>
      </div>
      <TwoCards />
      <Card />
    </main>
  );
};

export default IndexPage;
