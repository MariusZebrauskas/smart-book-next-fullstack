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
    <div
      className='fixed  z-20 inset-0  overflow-y-auto'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div
        className=' flex items-start justify-center min-h-screen pt-4 px-4 pb-20
     text-center sm:block sm:p-0  '
      >
        {/* card */}
        <div className='mt-20 opacity-0  sm:mt-0 fadeInGSAP '>
          <div
            className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
            aria-hidden='true'
          ></div>

          {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
          <span className='hidden  sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
            &#8203;
          </span>
          {/* items in card box */}
          <div
            className='opacity-0 popUpMenu z-20 relative  inline-block align-bottom bg-white rounded-lg 
      text-left overflow-hidden shadow-xl transform transition-all 
      sm:my-8 sm:align-middle  sm:max-w-lg sm:w-full '
          >
            <button
              onClick={() => dispatch(popUpEdite(id))}
              type='button'
              className='
            
             absolute top-4 right-4 
          px-2 py-2 border-2 border-gray-800 text-gray-800 font-medium text-xs leading-tight 
          uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 
          transition duration-150 ease-in-out'
            >
              X
            </button>
            <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 '>
              <div className='sm:flex sm:items-start  '>
                <div
                  className='mx-auto flex-shrink-0 flex items-center justify-center
               h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10
               xl:opacity-0
               '
                >
                  {/* <!-- Heroicon name: outline/exclamation --> */}
                  <svg
                    className='h-6 w-6 text-green-600 '
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                    />
                  </svg>
                </div>
                <div className=' mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                  <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-title'>
                    Update todo
                  </h3>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      On this panel you can update your to-do.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* text are to add data */}
            <div className='flex justify-center '>
              <div className=' mb-3 xl:w-96  w-full px-4'>
                <label className='form-label inline-block mb-2 text-gray-700'>
                  {/* {dataToUpdate.day} - {dataToUpdate.time} */}
                </label>
                <textarea
                  value={editeText}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setEditeText(e.target.value)
                  }
                  className='
      form-control
      w-full
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      h-40
    
      p-2
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
    '
                  id='exampleFormControlTextarea1'
                  rows={3}
                  placeholder='Your message'
                  // value={dataToUpdate.message || ''}
                  // onChange={onChangeHandler}
                ></textarea>
              </div>
            </div>
            <div className=' px-4 py-3 sm:px-6 flex justify-end '>
              <button
                //   onClick={() => submitDataHandler('submit')}
                type='button'
                onClick={changeText}
                className='
              
              px-6 py-2 border-2 cursor-pointer border-gray-800
          hover:text-gray-800 text-white font-medium text-xs leading-tight 
             uppercase rounded hover:bg-grey-400 hover:bg-opacity-5
             focus:outline-none focus:ring-0 
             transition duration-150 bg-black ease-in-out z-10'
              >
                submit
              </button>
            </div>
          </div>
        </div>
        {/* card */}
      </div>
    </div>
  );
};

export default Popup;
