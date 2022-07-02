import axios from 'axios';
import gsap from 'gsap';

import React, { useEffect, useState, useRef } from 'react';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import { HTTP } from '../config';
import { PropsTypes } from '../pages/dashboard/todo';
import { delteTask, popUpEdite } from '../redux/todoReducer';
import { lodingON, lodingOFF } from '..//redux/loadingReducer';
import Popup from './Popup';
import Spinner from './Spinner';

interface T extends DefaultRootState {
  loading: boolean;
}

const ListItem = ({ todo }: any) => {
  const todoList: any = useSelector<any>((store) => store.todo);
  const [token, setToken] = useState(null || localStorage.getItem('token'));
  const todoRef = useRef(null);
  const loading = useSelector<T>((store) => store.loading);

  const dispatch = useDispatch();

  let getIndex = todoList.findIndex((item: any) => {
    return item.text === todo.text && item.id === todo.id;
  });
  let itemId = getIndex;

  const deleteTodo = (text: any) => {
    if (loading) return;
    dispatch(lodingON());
    const onAnimationComplete = () => {
      // ++++++++++++++++++++++++++++++
      //argument text is object, because it is set up in redux i cant change it to new name
      //send obj to DB then find it and delte it
      if (token !== null) {
        axios
          .post(`${HTTP()}/api/deletetodos`, { token: token, objToDelete: text })
          .then((response) => {
            console.log('response from add todo:', response);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            // send obj to redux wich need to find and delte obj
            dispatch(delteTask(text));
            dispatch(lodingOFF());
          });
      }
    };

    var li = gsap.timeline({ onComplete: onAnimationComplete });
    li.to(todoRef.current, {
      y: 500,
      rotation: 7,
      duration: 2.5,
      delay: 0.1,
      opacity: 0,
      ease: 'power2.out',
    });
  };

  const popUpEditeTodo = (e: number) => {
    // get correct id
    //
    return dispatch(popUpEdite(e));
  };

  return (
    <li
      ref={todoRef}
      className=' bg-gray-200  px-4 flex mb-4 justify-between py-1 md:py-2
      border-b md:drop-shadow-md
     rounded-t-lg border-gray-300 lg:w-2/4 w-4/5 relative hover:bg-gray-300
      md:hover:scale-105 ease-in-out duration-200 md:hover:drop-shadow-xl
      
     '
    >
      <span
        onClick={() => popUpEditeTodo(itemId)}
        className='px-2.5 py-2 text-base flex cursor-pointer flex-wrap break-words '
      >
        {todo.text}
      </span>
      {todoList[itemId].edite === false && (
        <span
          className=' cursor-pointer px-2.5 py-2 text-base flex justify-center items-center  '
          style={{ color: '#111827' }}
          // onClick={() => deleteTodo(todo.text)}
          onClick={() => deleteTodo(todo)}
        >
          {loading ? <Spinner /> : 'X'}
        </span>
      )}
      {todoList[itemId] && todoList[itemId].edite === true ? (
        <Popup id={itemId} text={todo.text} />
      ) : null}
      {/* <PopTodo /> */}
    </li>
  );
};

export default ListItem;
