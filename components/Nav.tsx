import { gsap } from 'gsap';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { FcMindMap } from 'react-icons/fc';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import { closeMenu, openMenu } from '../redux/menuRedux';
import {
  calendarPage,
  contactPage,
  dashboardPage,
  homePage,
  todoPage,
  faqPage,
} from '../redux/pageReducer';
import Avatar from './Avatar';
import { User } from '../redux/userReducer';
import LogoIcon from './LogoIcon';
import LogoText from './LogoText';
import { closeSubmenu } from '../redux/submenuReducer';
interface T extends DefaultRootState {
  menu: boolean;
  submenu: boolean;
  page: string;
  user: null | User;
}
const Nav = () => {
  // redux states
  const menu = useSelector<T>((store) => store.menu);
  const page = useSelector<T>((store) => store.page);
  const user = useSelector<T>((store) => store.user);

  //   dispach function
  const dispatch = useDispatch();

  //   burget function
  const burger = () => {
    if (menu) {
      // close menu variables
      dispatch(closeMenu());

      return;
    } else if (!menu) {
      // close submenu
      dispatch(closeSubmenu());
      // open menu
      dispatch(openMenu());
    }
  };


  const opacity = (params: number, delay: number) => {
    gsap.to('.mobileMenuGsap', {
      opacity: params,
      delay: delay,
    });
  };

  const scale = (params: number, easing: string) => {
    gsap.to('.mobileMenuGsap', {
      scale: `${params}`,
      ease: `${easing}`,
      transformOrigin: '0% 0%',
    });
  };

  // menu animation
  useEffect(() => {
    if (!menu) {

      // scale
      scale(0, 'power4.out');
      // opacity
      opacity(0, -0.26);
    } else if (menu) {

      // scale
      scale(1, 'power3.out');
      // opacity
      opacity(1, 0.1);
    }
  }, [menu]);

  //   change background to dark on page select
  const changePageMenuBackground = (params: string) => {
    if (params === 'home') {
      return dispatch(homePage());
    } else if (params === 'todo') {
      return dispatch(todoPage());
    } else if (params === 'calendar') {
      return dispatch(calendarPage());
    } else if (params === 'contact') {
      return dispatch(contactPage());
    } else if (params === 'dashboard') {
      return dispatch(dashboardPage());
    } else if (params === 'faq') {
      return dispatch(faqPage());
    }
  };
  const login = () => {
    dispatch(closeMenu());
  };
  return (
    <nav className='bg-gray-800 relative '>
      <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 '>
        <div className='relative flex items-center justify-between h-16'>
          <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
            <button
              onClick={burger}
              type='button'
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 
              hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 
              focus:ring-inset focus:ring-white
              '
              aria-controls='mobile-menu'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>

              <svg
                className='block h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>

              <svg
                className='hidden h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
            <div className='flex-shrink-0 flex items-center'>
              <LogoIcon />
              <LogoText />
            </div>
            <div className='hidden sm:block sm:ml-6'>
              <div className='flex space-x-4'>
                <Link href='/'>
                  <a
                    onClick={() => changePageMenuBackground('home')}
                    className={
                      page === 'home'
                        ? 'bg-gray-900 text-white  px-3 py-2 rounded-md text-sm font-medium'
                        : ' text-gray-300 px-3 py-2 rounded-md text-sm font-medium'
                    }
                    aria-current='page'
                  >
                    Home
                  </a>
                </Link>
                <Link href='/dashboard'>
                  <a
                    onClick={() => changePageMenuBackground('dashboard')}
                    className={
                      page === 'dashboard'
                        ? 'bg-gray-900 text-white  px-3 py-2 rounded-md text-sm font-medium'
                        : ' text-gray-300 px-3 py-2 rounded-md text-sm font-medium'
                    }
                  >
                    Dashboard
                  </a>
                </Link>

                <Link href='/contact'>
                  <a
                    onClick={() => changePageMenuBackground('contact')}
                    className={
                      page === 'contact'
                        ? 'bg-gray-900 text-white  px-3 py-2 rounded-md text-sm font-medium'
                        : ' text-gray-300 px-3 py-2 rounded-md text-sm font-medium'
                    }
                  >
                    Contact
                  </a>
                </Link>
                <Link href='/faq'>
                  <a
                    onClick={() => changePageMenuBackground('faq')}
                    className={
                      page === 'faq'
                        ? 'bg-gray-900 text-white  px-3 py-2 rounded-md text-sm font-medium'
                        : ' text-gray-300 px-3 py-2 rounded-md text-sm font-medium'
                    }
                  >
                    F.A.Q.
                  </a>
                </Link>
              </div>
            </div>
          </div>
          {/* if user is logged in avatar pannel is activated */}
          {user ? (
            <Avatar />
          ) : (
            <Link href='/login'>
              <button
                type='button'
                onClick={login}
                className='animation-login text-gray-900 bg-white border 
          border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 
          focus:ring-gray-200 font-semibold rounded-lg text-sm px-3 py-1 mr-2  
          dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700
          dark:hover:border-gray-600 dark:focus:ring-gray-700  '
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* mobile menu */}

      <div className='  sm:hidden absolute w-full top-16 z-10' id='mobile-menu'>
        <div
          className='mobileMenuGsap opacity-1 
        scale-0
        origin-top-left
        bg-slate-800 px-2 pt-2 pb-3 space-y-1 '
        >
          <Link href='/'>
            <a
              className={
                page === 'home'
                  ? 'text-white block px-3 py-2 rounded-md text-base font-medium  '
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
              }
              aria-current='page'
            >
              Home
            </a>
          </Link>
          <Link href='/dashboard'>
            <a
              className={
                page === 'dashboard'
                  ? 'text-white block px-3 py-2 rounded-md text-base font-medium'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
              }
            >
              Dashboard
            </a>
          </Link>

          <Link href='/contact'>
            <a
              className={
                page === 'contact'
                  ? 'text-white block px-3 py-2 rounded-md text-base font-medium'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
              }
            >
              Contact
            </a>
          </Link>
          <Link href='/faq'>
            <a
              onClick={() => changePageMenuBackground('faq')}
              className={
                page === 'faq'
                  ? 'text-white block px-3 py-2 rounded-md text-base font-medium'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
              }
            >
              F.A.Q.
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
