// types


// export type FetchTodos = {
//   type?: string;
//   payload: {
//     id: number;
//     text: string;
//     compleated: boolean;
//   }[];
// };

// export type addNewTodo = {
//   type?: string;
//   payload: {
//     id: number;
//     text: string;
//     compleated: boolean;
//   }[];
// };

// type AllActions = FetchTodos | addNewTodo;

// action

export const fechTodos = (todos: any) => {
  return {
    type: 'fechTodos',
    payload: todos,
  };
};

export const addNewTodo = (newTodo: any) => {
  return {
    type: 'addNewTodo',
    payload: newTodo,
  };
};

export const delteTask = (text: any) => {
  return {
    type: 'delteTask',
    payload: text,
  };
};
export const popUpEdite = (id: number) => {
  return {
    type: 'popUpEdite',
    payload: id,
  };
};
export const changeTodoList = (obj: any) => {
  return {
    type: 'changeTodoList',
    payload: obj,
  };
};

// reducer

export const todosReducer = (state: any = [], action:any) => {
  switch (action.type) {
    case 'fechTodos':
      const { payload } = action;
      return (state = payload);
    case 'addNewTodo':
      const { newTodo } = action.payload;
      return [...state, newTodo];
    case 'delteTask':
      let x = action.payload;
      return state.filter((list: any) => list !== x);
    case 'popUpEdite':
      // get array id number
      let id = action.payload;
      // mutate state
        state[id].edite = !state[id].edite;
      // return value & make a pop
      return [...state];
    case 'changeTodoList':
      // get array id number
      let idAndText = action.payload;
      state[idAndText.id].edite = false;
      state[idAndText.id].text = idAndText.editeText;
      return [...state];

    default:
      return state;
  }
};
