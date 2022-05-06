import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import { HTTP } from '../config';
import { addNewTodo } from '../redux/todoReducer';

interface T extends DefaultRootState {
  todo: {
    payload: {
      id: number;
      text: string;
      compleated: boolean;
    }[];
  };
}

const SearchInput = () => {
  const [token, setToken] = useState(null || sessionStorage.getItem('token'));

  const ref = useRef<HTMLInputElement>(null);
  const todo: any = useSelector<T>((store) => store.todo);
  const store = useSelector<T>((store) => store);
  const dispach = useDispatch();
  // add todo
  const onClick = () => {
    // create new todo
    let newTodo: any = {
      id: Math.random(),
      text: ref.current?.value,
      compleated: false,
      edite: false,
    };

    // if no text dont add todo!
    if (!newTodo.text) return;
    // pass new todo to db
    if (token !== null) {
      axios
        .post(`${HTTP()}/api/addtodos`, { token: token, newTodo: newTodo })
        .then((response) => {
          console.log('response from add todo:', response);
          // setDataFromDb([...response.data.list]);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // pass new todo to redux
    dispach(addNewTodo({ newTodo: newTodo }));

    // clean input value
    if (ref.current) {
      ref.current.value = null!;
    }
    return;
  };

  // on ENTER pres handler
  const enter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      return onClick();
    }
  };

  useEffect(() => {
    // listen for enter klicks
    document.addEventListener('keypress', enter);
    // focus on input all time
    ref.current?.focus();
    // clean up function
    return () => document.removeEventListener('keypress', enter);
  });

  return (
    <div className='flex justify-center mt-20 w-full '>
      <div className='mb-3 lg:w-2/4 w-4/5 '>
        <div className='relative flex  items-stretch w-full mb-4 rounded '>
          <input
            ref={ref}
            type='search'
            className='form-control relative flex-auto min-w-0  w-full px-3 py-1.5 text-base font-normal 
            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
            ease-in-out m-0 focus:text-gray-700  focus:bg-white focus:border-blue-600 focus:outline-none'
            placeholder='Add a todo!'
            aria-label='Search'
            aria-describedby='button-addon2'
          />
          <button
            type='button'
            className='px-6 py-2 border-2 border-gray-800 text-gray-800 font-medium text-xs leading-tight 
            uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 
            transition duration-150 ease-in-out'
            onClick={onClick}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
