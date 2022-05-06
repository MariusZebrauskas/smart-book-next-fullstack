// actions
// get datat
export const getDataForSevenDays = (sevenDays: any) => {
  return {
    type: 'getDataForSevenDays',
    payload: sevenDays,
  };
};

// update data
export const updateDataForSevenDays = (update: any) => {
  return {
    type: 'updateDataForSevenDays',
    payload: update,
  };
};

// reducers

export const sevenDaysReducer = (state: any = [], action: any) => {
  switch (action.type) {
    case 'getDataForSevenDays':
      // get Data data to reducer
      const data = action.payload;
      return [...data];

    case 'updateDataForSevenDays':
      // get Data data to reducer
      let settings = action.payload;
      // update data
      state[settings.index][settings.day].message = settings.message;
      // save data
      return [...state];
    //   return state;
    default:
      return state;
  }
};
