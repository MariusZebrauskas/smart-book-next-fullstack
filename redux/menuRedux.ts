// type

type Types = {
  type: string;
};

// action

export const openMenu = () => {
  return {
    type: 'open',
  };
};
export const closeMenu = () => {
  return {
    type: 'close',
  };
};

// reducer 
// Aatar menu

export const menuReducer = (state = false, action: Types) => {
  switch (action.type) {
    case 'open':
      return (state = true);
    case 'close':
      return (state = false);
    default:
      return state;
  }
};
