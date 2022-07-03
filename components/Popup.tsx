import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { HTTP } from '../config';
import { changeTodoList, popUpEdite } from '../redux/todoReducer';
import gsap from 'gsap';

type Props = {
  text: string;
  id: number;
};

const Popup = ({ text, id }: Props) => {
  const [editeText, setEditeText] = useState(text);
  const [token, setToken] = useState(null || localStorage.getItem('token'));

  let dispatch = useDispatch();

  const changeText = () => {
    let obj = {
      editeText,
      id: id,
    };
    // change text in DB
    // send obj to DB then find it and delte it
    if (token !== null) {
      axios
        .post(`${HTTP()}/api/updatetodos`, { token: token, edite: obj })
        .then((response) => {
          console.log('response from add todo:', response);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // change text in redux
    dispatch(changeTodoList(obj));
  };

  // on ENTER pres handler
  const enter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      return changeText();
    }
  };

  useEffect(() => {
    // listen for enter klicks
    document.addEventListener('keypress', enter);
    // clean up function
    return () => document.removeEventListener('keypress', enter);
  });

  let tlPopUpTodo = gsap.timeline();
  // animation pop up
  useEffect(() => {
    tlPopUpTodo
      .to('.fadeInGSAP', {
        opacity: 1,
        ease: 'back.out(1.7)',
        duration: 0,
      })
      .to('.popUpMenu', {
        opacity: 1,
        duration: 0.1,
      })
      .from(
        '.popUpMenu',
        {
          scale: 0,

          duration: 1,
          ease: 'elastic.out(1, 0.3)',
        },
        '<'
      );
  }, []);

  return (
    <li className=' absolute bottom-0 left-0 right-0 top-0 bg-green-200  '>
      <textarea
        style={{ paddingRight: '7rem' }}
        // onClick={() => popUpEditeTodo(itemId)}
        value={editeText}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditeText(e.target.value)}
        className='px-6 py-4 text-base  flex-wrap break-words w-full h-full
        bg-gray-600 text-red-300 border-b-2 border-transparent'
      />

      <button
        onClick={changeText}
        className='flex absolute right-2 md:right-6 bottom-2   items-center px-2 py-2 
        font-medium tracking-wide text-white capitalize transition-colors
         duration-200 transform bg-gray-800 rounded-md hover:bg-slate-300
         hover:text-gray-800
          focus:outline-none focus:ring 
          ease-in-out 
           focus:ring-opacity-80'
      >
        <svg
          className='w-5 h-5 mx-1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fill-rule='evenodd'
            d='M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z'
            clip-rule='evenodd'
          />
        </svg>
        <span className='mx-1'>Update</span>
      </button>
    </li>
  );
};

export default Popup;
