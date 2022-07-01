// types

export type User = {
  name: string;
  email: string;
};

type Login = {
  type: string;
  payload: {
    name: string;
    email: string;
  };
};

type Logout = {
  type: string;
  payload: null;
};

type AllActions = Login | Logout;

// action
export const userLogin = (user: User | null) => {
  return {
    type: 'login',
    payload: user,
  };
};

export const userLogout = () => {
  return {
    type: 'logout',
  };
};

// reducer

export const userReducer = (state: null | User = null, action: AllActions) => {
  switch (action.type) {
    case 'login':
      console.log('-------------------');
      console.log('login is happening in redux');
      console.log('state: ', state);
      console.log('action: ', action);
      console.log('payload: ', action.payload);
      console.log('-------------------');
      if (!action.payload) {
        return (state = null);
      } else {
        return (state = action.payload);
      }

    case 'logout':
      return (state = null);
    default:
      return state;
  }
};
