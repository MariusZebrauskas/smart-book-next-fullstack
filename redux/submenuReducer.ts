// type

type Types = {
    type: string;
  };
  
  // action
  
  export const openSubmenu = () => {
    return {
      type: 'open',
    };
  };
  export const closeSubmenu = () => {
    return {
      type: 'close',
    };
  };


  
  
  // reducer

  
  export const submenuReducer = (state = false, action: Types) => {
    switch (action.type) {
      case 'open':
        return (state = true);
      case 'close':
        return (state = false);
      default:
        return state;
    }
  };