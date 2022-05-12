import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import { unknownPage } from '../redux/pageReducer';
import { closeSubmenu } from '../redux/submenuReducer';
import axios from 'axios';
import { HTTP } from '../config';
import { userLogin } from '../redux/userReducer';
import { useRouter } from 'next/router';
import Error from '../components/Error';

import Success from '../components/Success';

import Spinner from '../components/Spinner';
import { lodingOFF, lodingON } from '../redux/loadingReducer';
import { closeMenu } from '../redux/menuRedux';
import gsap from 'gsap';

interface T extends DefaultRootState {
  submenu: boolean;
  menu: boolean;
  loading: boolean;
  user: any;
}

const login = () => {
  // redux variables
  const dispatch = useDispatch();
  const submenu = useSelector<T>((store) => store.submenu);
  const menu = useSelector<T>((store) => store.menu);
  const user = useSelector<T>((store) => store.user);
  const loading = useSelector<T>((store) => store.loading);
  const router = useRouter();
  const [error, setError] = useState<null | string>(null);
  // input value
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  // set homepage varaibles
  useEffect(() => {
    dispatch(unknownPage());
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
  // on change INPUT
  const onChange = (e: React.ChangeEvent<HTMLInputElement>, input: string) => {
    // delete errors
    setError(null);
    // fill input fields
    setInputs((prev) => ({
      ...prev,
      [input]: e.target.value,
    }));
  };

  // on submit form value
  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    // prevent defoult
    e.preventDefault();
    // if loading then cancel
    if (loading) return;
    dispatch(lodingON());
    // delete errors
    setError(null);
    // Login
    axios
      .post(`${HTTP()}/api/login`, {
        email: inputs.email,
        password: inputs.password,
      })
      .then((response: any) => {
        dispatch(lodingOFF());

        if (response.data.login === false) {
          return setError(response.data.message);
        }
        let { token } = response.data;
        sessionStorage.setItem('token', token);
        dispatch(userLogin(response.data.user));
      })
      .catch((error) => {
        dispatch(lodingOFF());

        setError(error.message);
      });
  };

  useEffect(() => {
    // if user is logged in go to dashboard
    if (user) {
      router.push('/dashboard');
    }
  }, [user]);


// animation
var tlLogin = gsap.timeline();
useEffect(() => {
  tlLogin.fromTo(
    '.animationLogin',
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.2, stagger: 0.2 }
  )
  
}, []);



  return (
    <section
      onMouseEnter={onMouseEnter}
      className='max-w-md mt-20 p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800'
    >
      <h2 className='animationLogin text-lg font-semibold text-gray-700 capitalize dark:text-white'>
        Account Login
      </h2>

      <form onSubmit={onSubmit}>
        <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1'>
          <div>
            <label className='animationLogin text-gray-700 dark:text-gray-200'>Email Address</label>
            <input
              required
              value={inputs.email}
              onChange={(e) => onChange(e, 'email')}
              id='emailAddress'
              type='email'
              className='animationLogin block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring'
            />
          </div>

          <div>
            <label className='animationLogin text-gray-700 dark:text-gray-200'>Password</label>
            <input
              required
              value={inputs.password}
              onChange={(e) => onChange(e, 'password')}
              id='password'
              type='password'
              minLength={6}
              className='animationLogin block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring'
            />
          </div>
        </div>
        {/* submit */}
        <div className='flex justify-end mt-6 items-center '>
          <button
            type='submit'
            className='animationLogin px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
          >
            {loading ? 'Loading' : 'Login'}
          </button>
          {loading && <Spinner />}
        </div>
        <div className='animationLogin flex justify-start mt-6'>
          <p>Dont have an account ? </p>
          <Link href='/register'>
            <a className='hover:underline text-cyan-600 ml-2'>Register</a>
          </Link>
        </div>
      </form>
      {error && <Error error={error} setError={setError} />}
    </section>
  );
};

export default login;
