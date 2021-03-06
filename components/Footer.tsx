import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import gsap from 'gsap';
interface T extends DefaultRootState {
  page: string;
}
const date = new Date();
const Footer = () => {
  const page = useSelector<T>((state) => state.page);
  const fotterRef = useRef(null);
  

  // fade in on loading and unmounting animations
  useEffect(() => {
    let fadeInTimeline = gsap.timeline();
    fadeInTimeline.fromTo(
      fotterRef.current,
      {
        opacity: 0,
        y: page !== 'faq' ? 200 : 10,
      },
      { delay: page === 'faq' ? 0.35 : 1, opacity: 1, y: 0 }
    );
    return () => {
      let fadeOutTimeline = gsap.timeline();
      fadeOutTimeline.fromTo(
        fotterRef.current,
        {
          opacity: 1,
        },
        { opacity: 0, duration: 0, delay: page === 'faq' ? 0.5 : 0 }
      );
    };
  }, [page]);

  return (
    <footer
      style={{ opacity: 0 }}
      ref={fotterRef}
      className={
        page === 'todo'
          ? 'footerMarginDashboard bg-gray-800 '
          : page === 'contact' || page === 'unknown'
          ? 'footerMarginContact bg-gray-800 '
          : page === 'faq'
          ? 'mt-0 bg-gray-800'
          : page === 'dashboard'
          ? 'dasboard-footer bg-gray-800 '
          : 'bg-gray-800 mt-20'
      }
    >
      <div className='container px-6 py-8 mx-auto fotterWithOnUltraWide'>
        <div className='text-center'>
          <Link href='/dashboard'>
            <a className='text-2xl font-bold text-white hover:text-gray-300'>SmartBook</a>
          </Link>

          <p className='max-w-md mx-auto mt-2 text-gray-400'>
            Easy to use to-do and routine application.
          </p>
        </div>

        <hr className='my-10 border-gray-700' />

        <div className='flex flex-col items-center sm:flex-row sm:justify-between'>
          <p className='text-sm text-gray-400'>
            © Copyright 2021 - {date.getFullYear()}. All Rights Reserved.
          </p>
          <nav>
            <li className='list-none flex items-center flex-col  justify-center '>
              <p className='max-w-md   text-gray-400 '>
                Do you need a website to grow your own business ?
              </p>

              <a
                className=' text-blue-300  hover:text-yellow-300'
                target='_blank'
                href='http://www.developer-js.com'
              >
                www.developer-js.com
              </a>
            </li>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
