import { combineReducers, createStore } from 'redux';
import { menuReducer } from './menuRedux';
import { pageReducer } from './pageReducer';
import { sevenDaysReducer } from './sevenDaysReducer';
import { submenuReducer } from './submenuReducer';
import { todosReducer } from './todoReducer';
import { userReducer } from './userReducer';
import { spinnerReducer } from './loadingReducer';
import { listLoad } from './listInitialLoadReducer';

// combine reducers

const reducers = combineReducers({
  user: userReducer,
  menu: menuReducer,
  submenu: submenuReducer,
  page: pageReducer,
  todo: todosReducer,
  sevenDays: sevenDaysReducer,
  loading: spinnerReducer,
  listLoaded: listLoad,
});

// store

export const store = createStore(reducers);
