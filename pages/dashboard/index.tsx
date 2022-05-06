import React from 'react';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import DynamicCards from '../../components/DynamicCards';
import { dashbordCards } from '../../objects/dasbordCards';
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

  return (
    <section onMouseEnter={onMouseEnter} className='w-full flex justify-center items-center   '>
      <main className='flex mt-20 lg:mt-40 justify-around flex-wrap gap-10 max-w-7xl w-3/5 mb-20 '>
        {dashbordCards.map((card) => {
          return <DynamicCards key={card.id} card={card} />;
        })}
      </main>
    </section>
  );
};

export default dashboard;
