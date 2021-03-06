import React, { useState } from 'react';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import { closeSubmenu } from '../redux/submenuReducer';
import * as EmailValidator from 'email-validator';
import Error from '../components/Error';
import axios from 'axios';
import { HTTP } from '../config';
import Success from '../components/Success';
import Spinner from '../components/Spinner';
import { lodingOFF, lodingON } from '../redux/loadingReducer';
import { useRouter } from 'next/router';
import { closeMenu } from '../redux/menuRedux';
import Head from 'next/head';

interface T extends DefaultRootState {
  submenu: boolean;
  menu: boolean;
  loading: boolean;
}

// const HTTP = "http://localhost:5000";

const register = () => {
  const submenu = useSelector<T>((store) => store.submenu);
  const menu = useSelector<T>((store) => store.menu);
  const loading = useSelector<T>((store) => store.loading);
  const dispach = useDispatch();

  // router
  const router = useRouter();

  // register data
  const [userRegisterData, setUserRegisterData] = useState({
    userName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // close menu if click out of menu
  const onMouseEnter = () => {
    if (submenu) {
      dispach(closeSubmenu());
    }
    if (menu) {
      dispach(closeMenu());
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, inputChange: string) => {
    setError(null);
    setSuccess(null);
    setUserRegisterData((prev) => ({
      ...prev,
      [inputChange]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // email validation
    let emailIsValidated = EmailValidator.validate(userRegisterData.email);
    // password validation
    if (!emailIsValidated) return setError('Email is not valid');
    if (userRegisterData.password !== userRegisterData.passwordConfirm)
      return setError('Passwords do not match');

    // if everithing is valid
    dispach(lodingON());

    axios
      .post(`${HTTP()}/api/register`, {
        userName: userRegisterData.userName,
        email: userRegisterData.email,
        password: userRegisterData.password,
      })
      .then((response) => {
        dispach(lodingOFF());

        let userExist = response.data.userExists;
        // if email is taken
        if (userExist) return setError(response.data.message);

        // if account been created
        // clean fields
        setUserRegisterData({
          userName: '',
          email: '',
          password: '',
          passwordConfirm: '',
        });

        // success message
        setSuccess(response.data.message);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      })
      .catch((err) => {
        // set error on screen
        setError('Backend Message: Data invalid');
        // turn off spin
        return dispach(lodingOFF());
      });
  };

  return (
    <main
      onMouseEnter={onMouseEnter}
      className='max-w-4xl mt-20 mb-40 p-6 mx-auto bg-white rounded-md shadow-md '
    >
       <Head>
        <title>Free Weekly To Do List And Advanced To-do List Registration</title>
        <meta name='description' content='We offer two awesome applications for free, register an account and use the free Weekly to-do List and advanced To-do list ...' />
      </Head>
      <h2 className='text-lg font-semibold text-gray-700 capitalize '>
        Account settings
      </h2>

      <form onSubmit={onSubmit}>
        <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
          <div>
            <label className='text-gray-700 -200'>Username</label>
            <input
              value={userRegisterData.userName}
              onChange={(e) => onChange(e, 'userName')}
              minLength={3}
              required
              id='username'
              type='text'
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  -300  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
            />
          </div>

          <div>
            <label className='text-gray-700 -200'>Email Address</label>
            <input
              value={userRegisterData.email}
              onChange={(e) => onChange(e, 'email')}
              id='emailAddress'
              type='email'
              required
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  -300  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
            />
          </div>

          <div>
            <label className='text-gray-700 -200'>Password</label>
            <input
              value={userRegisterData.password}
              onChange={(e) => onChange(e, 'password')}
              minLength={6}
              required
              id='password'
              type='password'
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  -300  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
            />
          </div>

          <div>
            <label className='text-gray-700 -200'>Password Confirmation</label>
            <input
              value={userRegisterData.passwordConfirm}
              onChange={(e) => onChange(e, 'passwordConfirm')}
              minLength={6}
              id='passwordConfirmation'
              type='password'
              required
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  -300  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
            />
          </div>
        </div>

        <div className='flex justify-end mt-6'>
          <button
            type='submit'
            className='px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
          >
            {loading && <Spinner />}
            {loading ? 'Loading' : 'Save'}
          </button>
        </div>
      </form>
      {error && <Error setError={setError} error={error} />}
      {success && <Success success={success} />}
    </main>
  );
};

export default register;
