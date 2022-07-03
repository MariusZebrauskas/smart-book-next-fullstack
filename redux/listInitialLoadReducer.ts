// type

type Types = {
    type: string;
  };
  
  // action
  
  export const loadList = () => {
    return {
      type: 'load',
    };
  };
  export const closeList = () => {
    return {
      type: 'close',
    };
  };
  
  // reducer 
  // Aatar menu
  
  export const listLoad = (state = false, action: Types) => {
    switch (action.type) {
      case 'load':
        return (state = true);
      case 'close':
        return (state = false);
      default:
        return state;
    }
  };