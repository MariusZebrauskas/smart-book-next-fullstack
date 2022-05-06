// types
type Home = {
  type: string;
};
type Todo = {
  type: string;
};
type Calendar = {
  type: string;
};
type Contact = {
  type: string;
};
type unknownPage = {
  type: string;
};

type Actions = Home | Todo | Calendar | Contact | unknownPage;
// action

export const homePage = () => {
  return {
    type: 'home',
  };
};
export const todoPage = () => {
  return {
    type: 'todo',
  };
};
export const routinePage = () => {
  return {
    type: 'routine',
  };
};
export const calendarPage = () => {
  return {
    type: 'calendar',
  };
};
export const contactPage = () => {
  return {
    type: 'contact',
  };
};
export const dashboardPage = () => {
  return {
    type: 'dashboard',
  };
};
export const unknownPage = () => {
  return {
    type: 'unknown',
  };
};

// reducer

export const pageReducer = (state = 'home', action: Actions) => {
  switch (action.type) {
    case 'home':
      return (state = 'home');
    case 'todo':
      return (state = 'todo');
    case 'calendar':
      return (state = 'calendar');
    case 'contact':
      return (state = 'contact');
    case 'unknown':
      return (state = 'unknown');
    case 'routine':
      return (state = 'routine');
    case 'dashboard':
      return (state = 'dashboard');
    default:
      return state;
  }
};
