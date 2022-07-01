import axios from 'axios';
import React, { useEffect } from 'react';
import { HTTP } from '../config';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../redux/userReducer';

interface T extends DefaultRootState {
  submenu: boolean;
  menu: boolean;
  user: any;
}

const useFetch = () => {
  const dispatch = useDispatch();
  const user = useSelector<T>((store) => store.user);
  const loginHook = () => {
    if (localStorage.getItem('token') === null) {
      return;
    }
    if (user) {
      return;
    }
    if (!user && localStorage.getItem('token') !== null) {
      axios
        .post(`${HTTP()}/api/token`, { token: localStorage.getItem('token') })
        .then((response) => {
          dispatch(userLogin(response.data.user));
        })
        .catch((error) => {
          return console.log(error);
        });
    }
  };
  return { loginHook };
};

export default useFetch;
