// type
type Types = {
    type: string;
  };
// action
export const lodingON = () => {
  return {
    type: 'lodingON',
  };
};

export const lodingOFF = () => {
  return {
    type: 'lodingOFF',
  };
};

// reducer

export const spinnerReducer = (state = false, action: Types) => {
  switch (action.type) {
    case 'lodingON':
      return (state = true);

    case 'lodingOFF':
      return (state = false);

    default:
      return state;
  }
};
