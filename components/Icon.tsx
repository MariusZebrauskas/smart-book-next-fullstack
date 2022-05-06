import React, { useState, useEffect } from 'react';
import { DefaultRootState, useSelector } from 'react-redux';

interface T extends DefaultRootState {
  user: any;
}
type User = {
  userName: string;
  email: string;
};

const Icon = () => {
  // first letter of name
  const [firstLetter, setFisrtLetter] = useState(null);

  // get user from redux
  const user: any = useSelector<T>((store) => store.user);

  //   print usr first letter on menu on login;
  useEffect(() => {
    if (user) {
      let letter = user.userName.split('');
      setFisrtLetter(letter[0]);
    }
  }, [user]);

  return (
    <div className='container  bg-slate-50 rounded-full'>
      <div className='w-8 h-8 flex justify-center  items-center '>
        <h4 className='font-bold'>M</h4>
      </div>
    </div>
  );
};

export default Icon;
