import axios from 'axios';
import gsap from 'gsap';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import DynamicCards from '../../components/DynamicCards';
import { HTTP } from '../../config';
import { dashbordCards } from '../../objects/dasbordCards';
import { closeMenu } from '../../redux/menuRedux';
import { dashboardPage } from '../../redux/pageReducer';
import { closeSubmenu } from '../../redux/submenuReducer';
import { userLogin } from '../../redux/userReducer';

interface T extends DefaultRootState {
  submenu: boolean;
  menu: boolean;
  user: any;
}

const dashboard = ({ dashboardApi }: any) => {
  const { data } = dashboardApi;

  const submenu = useSelector<T>((store) => store.submenu);
  const menu = useSelector<T>((store) => store.menu);
  const dispach = useDispatch();
  const user = useSelector<T>((store) => store.user);

  // close menu if click out of menu
  const onMouseEnter = () => {
    if (submenu) {
      dispach(closeSubmenu());
    }
    if (menu) {
      dispach(closeMenu());
    }
  };

  // on page load set homepage + close submenu
  useEffect(() => {
    // set page
    dispach(dashboardPage());
    // close sub menu
    if (submenu) {
      dispach(closeSubmenu());
    }
    if (menu) {
      dispach(closeMenu());
    }
  }, []);
  // close sub menu animation opne close

  // animation
  var tlDashboard = gsap.timeline();
  useEffect(() => {
    tlDashboard.from('.animationCards', {
      opacity: 0,
      scale: 0.9,
      ease: 'back.out(3)',
      delay: 0.3,
      duration: 0.5,
      stagger: 0.3,
    });
  }, []);

  // login with token  |
  useEffect(() => {
    if (localStorage.getItem('token') === null || user) {
      return;
    }
    axios
      .post(`${HTTP()}/api/token`, { token: localStorage.getItem('token') })
      .then((response) => {
        dispach(userLogin(response.data.user));
      })
      .catch((error) => {
        return console.log(error);
      });
  }, []);

  return (
    <section onMouseEnter={onMouseEnter} className='w-full flex justify-center items-center   '>
      <Head>
        <title>Smart book - dashboard</title>
        <meta name='description' content='pick app on dashboard to start adding todos' />
      </Head>
      <main className='flex mt-20 lg:mt-40 justify-around flex-wrap gap-10 max-w-7xl w-3/5 mb-20 '>
        {data.map((card: any) => {
          return <DynamicCards key={card.id} card={card} />;
        })}
      </main>
    </section>
  );
};

export async function getStaticProps() {
  //get data from backend
  const res = await fetch('https://smart-book.org/api/dasboard-data');
  const dashboardApi = await res.json();
  // send data as a props in dashboard page
  return {
    props: {
      dashboardApi,
    },
  };
}

export default dashboard;
