import axios from 'axios';
import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import { contactPage } from '../redux/pageReducer';
import { closeSubmenu } from '../redux/submenuReducer';
import Success from '../components/Success';
import Error from '../components/Error';
import { HTTP } from '../config';
import Spinner from '../components/Spinner';
import { lodingOFF, lodingON } from '../redux/loadingReducer';
import { closeMenu } from '../redux/menuRedux';
import Head from 'next/head';
interface T extends DefaultRootState {
  submenu: boolean;
  menu: boolean;
  loading: boolean;
}

const contact = () => {
  const dispatch = useDispatch();
  const submenu = useSelector<T>((store) => store.submenu);
  const menu = useSelector<T>((store) => store.menu);
  const [successMessage, setSuccessMessage] = useState<null | string>(null);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const loading = useSelector<T>((store) => store.loading);

  const [emailData, setEmailData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // on page load
  useEffect(() => {
    // set page
    dispatch(contactPage());
    // close sub menu
    if (submenu) {
      dispatch(closeSubmenu());
    }
    // close sub menu
    if (menu) {
      dispatch(closeMenu());
    }
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

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    dispatch(lodingON());
    setErrorMessage(null);
    setSuccessMessage(null);
    axios
      .post(`${HTTP()}/api/email`, emailData)
      .then((response) => {
        const { success } = response.data;
        if (success) {
          setEmailData({ name: '', email: '', message: '' });
          setSuccessMessage(response.data.message);
          dispatch(lodingOFF());
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(lodingOFF());

        setErrorMessage('Opps something went wrong');
      });
  };

  // animation
  var tlcontact = gsap.timeline();
  useEffect(() => {
    tlcontact.fromTo(
      '.animationContact',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.2, stagger: 0.2 }
    ).to(".shadowAnimationContact",{
      boxShadow:`0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`
    })
    
  }, []);



  return (
    <form
      onSubmit={sendEmail}
      onMouseEnter={onMouseEnter}
      className='shadowAnimationContact w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md mt-20 relative'
    >
       <Head>
        <title>A To-Do List And Routine Calendar to Organize Your Life</title>
        <meta name='description' content='Tell us how can we help, lets get in touch' />
      </Head>
      <h2 className='animationContact text-3xl font-semibold text-center text-gray-800 '>
        Get in touch
      </h2>
      <p className='animationContact mt-10 text-center text-gray-600 '>Tell us how can we help.</p>

      <div className='mt-10 '>
        <div className='items-center -mx-2 md:flex'>
          <div className=' animationContact w-full mx-2'>
            <label className='block mb-2 text-sm font-medium text-gray-600 '>
              Name
            </label>
            {/* name */}
            <input
              value={emailData.name}
              required
              minLength={3}
              onChange={(e) => setEmailData({ ...emailData, name: e.target.value })}
              className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-md   focus:border-blue-400 focus:ring-blue-300  focus:outline-none focus:ring focus:ring-opacity-40'
              type='text'
            />
          </div>

          <div className=' animationContact w-full mx-2 mt-4 md:mt-0'>
            <label className='block mb-2 text-sm font-medium text-gray-600 '>
              E-mail
            </label>
            {/* email */}
            <input
              value={emailData.email}
              onChange={(e) => setEmailData({ ...emailData, email: e.target.value })}
              className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-md   focus:border-blue-400 focus:ring-blue-300  focus:outline-none focus:ring focus:ring-opacity-40'
              type='email'
              required
            />
          </div>
        </div>

        <div className='animationContact w-full mt-4'>
          <label className='block mb-2 text-sm font-medium text-gray-600 '>
            Message
          </label>
          {/* message */}
          <textarea
            onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
            value={emailData.message}
            required
            className='block w-full h-40 px-4 py-2 text-gray-700 bg-white border rounded-md   focus:border-blue-400  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40'
          ></textarea>
        </div>

        <div className='flex justify-center flex-col mt-6 items-center '>
          <button
            type='submit'
            className='animationContact px-4 py-2 text-white transition-colors duration-200 w-full mb-2 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
          >
            {loading ? 'Loading' : 'Send Message'}
          </button>
          {loading && <Spinner />}
        </div>
      </div>
      {successMessage && <Success success={successMessage} />}
      {errorMessage && <Error error={successMessage} setError={setErrorMessage} />}
    </form>
  );
};

export default contact;
