import React, { useEffect, useState, useRef, useMemo } from 'react';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import ListItem from '../../components/ListItem';
import AddTodo from '../../components/SearchInput';
import { todoPage } from '../../redux/pageReducer';
import { closeSubmenu } from '../../redux/submenuReducer';

import { fechTodos } from '../../redux/todoReducer';
import axios from 'axios';
import { HTTP } from '../../config';
import { useRouter } from 'next/router';
import gsap from 'gsap';
import Head from 'next/head';
import { closeList, loadList } from '../../redux/listInitialLoadReducer';

interface T extends DefaultRootState {
  submenu: boolean;
  user: any;
  listLoaded: boolean;
  todo: {
    payload: {
      id: number;
      text: string;
      compleated: boolean;
    }[];
  };
}

export type PropsTypes = {
  todo: {
    id: number;
    text: string;
    compleated: boolean;
    edite: boolean;
  };
};

type Todo = {
  id: number;
  text: string;
  compleated: boolean;
  edite: boolean;
};

const todo = () => {
  // redux variables
  const dispatch = useDispatch();
  const submenu = useSelector<T>((store) => store.submenu);
  const todo: any = useSelector<T>((store) => store.todo);
  const user = useSelector<T>((store) => store.user);
  const listLoaded = useSelector<T>((store) => store.listLoaded);
  const router = useRouter();
  const [token, setToken] = useState<null | string>(null);
  let listRef = useRef<any>(null);

  // on page loads
  useEffect(() => {
    // if no user redirect to login
    if (!user) {
      router.push('/login');
      return;
    }
    setToken(null || localStorage.getItem('token'));
    // get todo data
    if (user) {
      if (token !== null) {
        axios
          .post(`${HTTP()}/api/gettodos`, { token: token })
          .then((response) => {
            // send data to redux
            dispatch(fechTodos([...response.data.list]));
          })

          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            // loading all elements on screen
            if (listLoaded) return;
            // big screen animation
            let listTimeline = gsap.timeline({
              onComplete: () => {
                dispatch(loadList());
              },
            });
            console.log('-----------------------------');
            console.dir(document.body.clientWidth > 768 );
            console.log('-----------------------------');
            if (document.body.clientWidth < 768) {
              listTimeline.fromTo(
                listRef.current.children,
                { opacity: 0, y: '0' },
                {
                  opacity: 1,
                  y: 0,
                  stagger: 0.2,
                  duration: 2,
                  ease: "power4.out",
                }
              );
            } else {
              listTimeline.fromTo(
                listRef.current.children,
                { opacity: 0, y: '200' },
                {
                  opacity: 1,
                  y: 0,
                  stagger: 0.25,
                  duration: 3,
                  ease: 'elastic.out(1, .4)',
                }
              );
            }
          });
      }

      // set homepage varaibles
      dispatch(todoPage());

      // get all todos from db
    }
  }, [user, token]);

  const onMouseEnter = () => {
    if (submenu) {
      dispatch(closeSubmenu());
    }
  };

  useEffect(() => {
    // reset loding animation of the list

    return () => {
      dispatch(closeList());
    };
  }, []);

  return (
    <main className='relative' onMouseEnter={onMouseEnter}>
      <Head>
        <title>Smart book - to-do</title>
        <meta
          name='description'
          content='Add your to-dos to the database and access them from any device you want! Put here shopping lists, birthdays, MOTs, meetings or anything what you need to remember, and simply enjoy the app!'
        />
      </Head>
      <Header />
      <div className=' flex justify-center flex-col mb-40 w-full'>
        <AddTodo />

        <ul
          ref={listRef}
          className='text-sm font-medium text-gray-900  border-gray-200 
      rounded-lg   
      mb-20 flex justify-center flex-col items-center
      '
        >
          {todo &&
            todo.map((todo: Todo) => {
              return <ListItem key={Math.random()} todo={todo} />;
            })}
        </ul>
      </div>
    </main>
  );
};

export default todo;
