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

interface T extends DefaultRootState {
  submenu: boolean;
  loading: boolean;
}

// const HTTP = "http://localhost:5000";

const register = () => {
  const submenu = useSelector<T>((store) => store.submenu);
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
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, inputChange: string) => {
    setError(null);
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
        // turn off spinner
        return dispach(lodingOFF());
      });
  };

  return (
    <section
      onMouseEnter={onMouseEnter}
      className='max-w-4xl mt-20 mb-40 p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800'
    >
      <h2 className='text-lg font-semibold text-gray-700 capitalize dark:text-white'>
        Account settings
      </h2>

      <form onSubmit={onSubmit}>
        <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
          <div>
            <label className='text-gray-700 dark:text-gray-200'>Username</label>
            <input
              value={userRegisterData.userName}
              onChange={(e) => onChange(e, 'userName')}
              minLength={3}
              id='username'
              type='text'
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring'
            />
          </div>

          <div>
            <label className='text-gray-700 dark:text-gray-200'>Email Address</label>
            <input
              value={userRegisterData.email}
              onChange={(e) => onChange(e, 'email')}
              id='emailAddress'
              type='email'
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring'
            />
          </div>

          <div>
            <label className='text-gray-700 dark:text-gray-200'>Password</label>
            <input
              value={userRegisterData.password}
              onChange={(e) => onChange(e, 'password')}
              minLength={6}
              id='password'
              type='password'
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring'
            />
          </div>

          <div>
            <label className='text-gray-700 dark:text-gray-200'>Password Confirmation</label>
            <input
              value={userRegisterData.passwordConfirm}
              onChange={(e) => onChange(e, 'passwordConfirm')}
              minLength={6}
              id='passwordConfirmation'
              type='password'
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring'
            />
          </div>
        </div>

        <div className='flex justify-end mt-6'>
          <button
            type='submit'
            className='px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
          >
            {loading && <Spinner />}
            Save
          </button>
        </div>
      </form>
      {error && <Error setError={setError} error={error} />}
      {success && <Success success={success} />}
    </section>
  );
};

export default register;
