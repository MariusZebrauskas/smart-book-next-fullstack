import gsap from 'gsap';
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

  return (
    <section onMouseEnter={onMouseEnter} className='w-full flex justify-center items-center   '>
      <main className='flex sm:mt-20 lg:mt-40 justify-around flex-wrap gap-10 max-w-7xl w-3/5 mb-20 '>
        {dashbordCards.map((card: any) => {
          return <DynamicCards key={card.id} card={card} />;
        })}
      </main>
    </section>
  );
};

export default dashboard;
