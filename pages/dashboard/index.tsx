import axios from 'axios';
import gsap from 'gsap';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import DynamicCards from '../../components/DynamicCards';
import { dashbordCards } from '../../objects/dasbordCards';
import { closeMenu } from '../../redux/menuRedux';
import { dashboardPage } from '../../redux/pageReducer';
import { closeSubmenu } from '../../redux/submenuReducer';

interface T extends DefaultRootState {
  submenu: boolean;
  menu: boolean;
}

const dashboard = () => {

  const submenu = useSelector<T>((store) => store.submenu);
  const menu = useSelector<T>((store) => store.menu);
  const dispach = useDispatch();

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
      scale: 0.8,
      ease: 'back.out(3)',
      duration: 0.5,
      stagger: 0.5,
    });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get('/api/dasboard-data')
  //     .then((res: any) => {
  //       console.log('res:', res);
  //     })
  //     .catch((err: any) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <section onMouseEnter={onMouseEnter} className='w-full flex justify-center items-center   '>
      <Head>
        <title>Smart book - dashboard</title>
        <meta name='description' content='pick app on dashboard to start adding todos' />
      </Head>
      <main className='flex mt-20 lg:mt-40 justify-around flex-wrap gap-10 max-w-7xl w-3/5 mb-20 '>
        {dashbordCards.map((card: any) => {
          return <DynamicCards key={card.id} card={card} />;
        })}
      </main>
    </section>
  );
};

// export async function getStaticProps() {
//   let data = 'nothing';

// // 
// const res = await fetch('/api/dasboard-data')
// const posts = await res.json()

//   return {
//     props: {
//       data,
//     },
//   };
// }

export default dashboard;
