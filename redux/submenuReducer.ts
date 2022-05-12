// type

type Types = {
    type: string;
  };
  
  // action
  
  export const openSubmenu = () => {
    return {
      type: 'openSubmenu',
    };
  };
  export const closeSubmenu = () => {
    return {
      type: 'closeSubmenu',
    };
  };


  
  
  // reducer

  
  export const submenuReducer = (state = false, action: Types) => {
    switch (action.type) {
      case 'openSubmenu':
        return (state = true);
      case 'closeSubmenu':
        return (state = false);
      default:
        return state;
    }
  };