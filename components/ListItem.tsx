import axios from 'axios';
import gsap from 'gsap';

import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HTTP } from '../config';
import { PropsTypes } from '../pages/dashboard/todo';
import { delteTask, popUpEdite } from '../redux/todoReducer';

import Popup from './Popup';

const ListItem = ({ todo }: any) => {
  const todoList: any = useSelector<any>((store) => store.todo);
  const [token, setToken] = useState(null || localStorage.getItem('token'));
  const todoRef = useRef(null);

  const dispatch = useDispatch();

  let getIndex = todoList.findIndex((item: any) => {
    return item.text === todo.text && item.id === todo.id;
  });
  let itemId = getIndex;

  const deleteTodo = (text: any) => {

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
          });
      }

      // send obj to redux wich need to find and delte obj
      // removed function witch delete from redux
      //dispatch(delteTask(text));
    };
    var li = gsap.timeline({ onComplete: onAnimationComplete });
    li.to(todoRef.current, { y: 150, duration: 1.3, ease: 'power3.out' })
      .to(todoRef.current, { rotation: 5, duration: 3, ease: 'power3.out' }, '-=1.2')
      .to(todoRef.current, { opacity: '0', duration: 0.3, ease: 'power3.out' }, '-=2.7')
      .to(todoRef.current, { display: 'none', duration: 0.3, ease: 'power3.out' }, '<');
  };

  const popUpEditeTodo = (e: number) => {
    // get correct id
    //
    return dispatch(popUpEdite(e));
  };

  return (
    <li
      ref={todoRef}
      className=' bg-gray-200  px-4 flex mb-4 justify-between py-2 border-b 
     rounded-t-lg border-gray-600 lg:w-2/4 w-4/5 relative hover:bg-gray-300
      
      
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
          X
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
