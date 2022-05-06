import React from 'react';

type Props = {
  popUpWindow: (params: any, dataFromScreen?: any) => void;
  dataToUpdate: any;
  setDataToUpdate: React.Dispatch<any>;
};

const PopUpdate = ({ popUpWindow, dataToUpdate, setDataToUpdate }: Props) => {
  const submitDataHandler = (condision: string) => {
    if (condision === 'cancel') {
      popUpWindow('cancel');
    } else if (condision === 'submit') {
      //  dataToUpdate
      //   data go back to routine page

      popUpWindow('submit');
      //close after submit
      popUpWindow('cancel');
    }
    //
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDataToUpdate((prev: any) => ({
      ...prev,
      message: e.target.value,
    }));
  };
  return (
    <div
      className='fixed z-10 inset-0 overflow-y-auto'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div
        className='flex items-start justify-center min-h-screen pt-4 px-4 pb-20
       text-center sm:block sm:p-0 '
      >
        {/* card */}
        <div className='mt-20 sm:mt-0'>
    
          {/* <!--
      Background overlay, show/hide based on modal state.
      
      Entering: "ease-out duration-300"
      From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    --> */}
          <div
            className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
            aria-hidden='true'
          ></div>

          {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
            &#8203;
          </span>

          {/* <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    --> */}
          <div
            className='relative inline-block align-bottom bg-white rounded-lg 
        text-left overflow-hidden shadow-xl transform transition-all 
        sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
          >
            <button
              onClick={() => submitDataHandler('cancel')}
              type='button'
              className=' absolute top-4 right-4 
            px-2 py-2 border-2 border-gray-800 text-gray-800 font-medium text-xs leading-tight 
            uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 
            transition duration-150 ease-in-out'
            >
              X
            </button>
            <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
              <div className='sm:flex sm:items-start '>
                <div className='mx-auto flex-shrink-0 flex items-center justify-center
                 h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10
                 xl:opacity-0
                 '>
                  {/* <!-- Heroicon name: outline/exclamation --> */}
                  <svg
                    className='h-6 w-6 text-green-600 '
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                    />
                  </svg>
                </div>
                <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                  <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-title'>
                    Add or Update todo
                  </h3>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      On this panel you can add, update, delete your todos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* text are to add data */}
            <div className='flex justify-center '>
              <div className='mb-3 xl:w-96  w-full px-4'>
                <label className='form-label inline-block mb-2 text-gray-700'>
                  {dataToUpdate.day} - {dataToUpdate.time}
                </label>
                <textarea
                  className='
        form-control
        w-full
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        h-40
        
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      '
                  id='exampleFormControlTextarea1'
                  rows={3}
                  placeholder='Your message'
                  value={dataToUpdate.message || ''}
                  onChange={onChangeHandler}
                ></textarea>
              </div>
            </div>
            <div className=' px-4 py-3 sm:px-6 flex justify-end '>
              <button
                onClick={() => submitDataHandler('submit')}
                type='button'
                className='px-6 py-2 border-2 cursor-pointer border-gray-800
            hover:text-gray-800 text-white font-medium text-xs leading-tight 
               uppercase rounded hover:bg-grey-400 hover:bg-opacity-5
               focus:outline-none focus:ring-0 
               transition duration-150 bg-black ease-in-out z-10'
              >
                submit
              </button>
            </div>
          </div>
        </div>
        {/* card */}
      </div>
    </div>
  );
};

export default PopUpdate;
