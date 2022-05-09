import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HTTP } from '../config';
import { PropsTypes } from '../pages/dashboard/todo';
import { delteTask, popUpEdite } from '../redux/todoReducer';
import Popup from './Popup';
import gsap from 'gsap';

const ListItem = ({ todo }: any) => {
  const todoList: any = useSelector<any>((store) => store.todo);
  const [token, setToken] = useState(null || sessionStorage.getItem('token'));

  const dispatch = useDispatch();

  let getIndex = todoList.findIndex((item: any) => {
    return item.text === todo.text && item.id === todo.id;
  });
  let itemId = getIndex;

  const deleteTodo = (text: any) => {
    // argument text is object, because it is set up in redux i cant change it to new name
    // send obj to DB then find it and delte it
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
    dispatch(delteTask(text));
  };
  // FIXME: deleting all list need to fix bug by adding unique ID

  const popUpEditeTodo = (e: number) => {
    // get correct id
    //
    return dispatch(popUpEdite(e));
  };

  // animation on load
  let tl = gsap.timeline();

  useEffect(() => {
    tl.fromTo(
      '.animatingBox',
      { opacity: 0, bottom: -500, left: -350, scale: 0 },
      { opacity: 0.8, bottom: -300, left: -350, duration: 0.3, scale: 0.8,ease: "power4.out", stagger: 0.1 }
    ).to(
      '.animatingBox',
      { opacity: 1, bottom: 0, left: 0, duration: 0.5, scale: 1, stagger: 0.1,  },
      "-=26%"
    );
  }, []);

  return (
    <li
      className=' bg-gray-200  px-4 flex mb-4 justify-between py-2 border-b 
     rounded-t-lg border-gray-600 lg:w-2/4 w-4/5 relative hover:bg-gray-300
     animatingBox opacity-0
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
    </li>
  );
};

export default ListItem;
