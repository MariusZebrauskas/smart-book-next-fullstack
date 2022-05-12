import gsap from 'gsap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector, DefaultRootState } from 'react-redux';
import { closeMenu, openMenu } from '../redux/menuRedux';
import { openSubmenu, closeSubmenu } from '../redux/submenuReducer';
import { userLogout } from '../redux/userReducer';
import Icon from './Icon';

interface T extends DefaultRootState {
  menu: string;
  submenu: string;
}

const Avatar = () => {
  const dispatch = useDispatch();
  const menu = useSelector<T>((store) => store.menu);

  const submenu = useSelector<T>((store) => store.submenu);

  const router = useRouter();

  const closeSubMenuGSAP = () => {
    gsap.to('.avatar-GSAP', { y: 32, duration: 0.2, opacity: 0, display: 'none' });
  };
  const openSubMenuGSAP = () => {
    gsap.to('.avatar-GSAP', { y: 0, duration: 0.3, opacity: 1, display: 'block' });
  };

  const closeSubmenuHandler = () => {
    // close menu animation
    closeSubMenuGSAP();
    return dispatch(closeSubmenu());
  };

  const logout = () => {
    dispatch(userLogout());
    sessionStorage.removeItem('token');
    dispatch(closeSubmenu());
    router.push('/');
  };

  const avatarHndler = () => {
    if (!submenu) {
      // close main menu
      dispatch(closeMenu());
      // open submenu
      dispatch(openSubmenu());
    } else if (submenu) {
      // close submenu menu
      dispatch(closeSubmenu());
    }
  };

  useEffect(() => {
    if (submenu) {
      openSubMenuGSAP();
    } else if (!submenu) {
      closeSubMenuGSAP();
    }
  }, [submenu]);

  return (
    <div className=' absolute z-10 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
      {/* avatar */}
      <div className='ml-3 relative'>
        <div onClick={avatarHndler}>
          <button
            type='button'
            className='bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
            id='user-menu-button'
            aria-expanded='false'
            aria-haspopup='true'
          >
            <span className='sr-only'>Open user menu</span>
            <Icon />
          </button>
        </div>
        {/* sub avatar */}
        <div
          className='avatar-GSAP origin-top-right absolute right-0 mt-2 w-48 
        rounded-md shadow-lg py-1 bg-white ring-1
         ring-black ring-opacity-5 focus:outline-none
         translate-y-8
         opacity-0

         
         '
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='user-menu-button'
        >
          <Link href='/dashboard'>
            <a
              // onClick={closeSubmenuHandler}
              className='block px-4 py-2 text-sm text-gray-700'
              role='menuitem'
              id='user-menu-item-0'
            >
              Dashboard
            </a>
          </Link>

          <a
            // onClick={logout}
            className='block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer'
            role='menuitem'
            id='user-menu-item-2'
          >
            Sign out
          </a>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
