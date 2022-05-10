import gsap from 'gsap';
import React, { useEffect } from 'react';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import DynamicCards from '../../components/DynamicCards';
import { dashbordCards } from '../../objects/dasbordCards';
import { dashboardPage } from '../../redux/pageReducer';
import { closeSubmenu } from '../../redux/submenuReducer';

interface T extends DefaultRootState {
  submenu: boolean;
}

const dashboard = () => {
  const submenu = useSelector<T>((store) => store.submenu);
  const dispach = useDispatch();

  // close menu if click out of menu
  const onMouseEnter = () => {
    if (submenu) {
      dispach(closeSubmenu());
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

  // animation
  var tlDashboard = gsap.timeline();
  useEffect(() => {
    tlDashboard.from(
      '.animationCards',
      {  opacity:0, scale:0.8, ease: "back.out(3)", duration: .5, stagger: .5 }
    )
  }, []);





  return (
    <section onMouseEnter={onMouseEnter} className='w-full flex justify-center items-center   '>
      <main className='flex mt-20 lg:mt-40 justify-around flex-wrap gap-10 max-w-7xl w-3/5 mb-20 '>
        {dashbordCards.map((card: any) => {
          return <DynamicCards key={card.id} card={card} />;
        })}
      </main>
    </section>
  );
};

export default dashboard;
