import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import Day from '../../components/Day';
import PopUpdate from '../../components/PopUpdate';
import RoutineHeader from '../../components/RoutineHeader';
import Spinner from '../../components/Spinner';
import { HTTP } from '../../config';
import { sevenDays } from '../../objects/sevendays';
import { routinePage } from '../../redux/pageReducer';
import { getDataForSevenDays, updateDataForSevenDays } from '../../redux/sevenDaysReducer';

interface T extends DefaultRootState {
  sevenDays: {
    time: string;
    id: number;

    monday: {
      id: number;
      message: string;
      day: string;
      parenTime: string;
    }[];
  };
}
const routine = () => {
  // redux
  const dispatch = useDispatch();
  const days: any = useSelector<T>((state) => state.sevenDays);
  const { user }: any = useSelector((store) => store);

  // state to pop up screen
  const [openPopUp, setOpenPopUp] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState<any>(null);
  const router = useRouter();
  const [token, setToken] = useState<null | string>(null);

  // pop up handler
  const popUpWindow = (params: string, dataFromScreen: any) => {
    if (params === 'pop') {
      setDataToUpdate(dataFromScreen);
      return setOpenPopUp(true);
    } else if (params === 'cancel') {
      return setOpenPopUp(false);
    } else if (params === 'submit') {
      // day in object
      let dayObj = dataToUpdate.day.toLowerCase();
      // index in object
      let index: any = days.findIndex((oneDay: any) => {
        return oneDay[dayObj].id === dataToUpdate.id;
      });
      // message to update
      let message = dataToUpdate.message;

      // final obj
      let update = {
        index: index,
        day: dayObj,
        message: message,
      };

      // update data in DB
      if (token !== null) {
        axios
          .post(`${HTTP()}/api/update-routine`, { token: token, update: update })
          .then((response) => {
            // send db data to redux
            //console.log('response:', response);
          })

          .catch((error) => {
            console.log(error);
          });
      }

      // update data in REDUX
      dispatch(updateDataForSevenDays(update));
    }
  };

  // on page loads get routine from db
  useEffect(() => {
    // if no user redirect to login
    if (!user) {
      router.push('/login');
      return;
    }

    // get todo data
    if (user) {
      setToken(null || localStorage.getItem('token'));
      if (token !== null) {
        axios
          .post(`${HTTP()}/api/routine`, { token: token })
          .then((response) => {
            // send db data to redux
            let routineDataFromDb = response.data.routine[0];

            dispatch(getDataForSevenDays(routineDataFromDb));
          })

          .catch((error) => {
            console.log(error);
          });
      }

      // set homepage varaibles
      dispatch(routinePage());
    }
  }, [user, token]);

  // animation
  // FIXME:POP UP ANIMATION
  // padaryti use EFFECT LOGIKA PAGAL POP UP VARIABLE
  // padaryti HOME ANIMATION BISKI KITAIP NEREIKIA STAGGER LIST DARYTI
  if (days.length === 0) {
    return (
      <div className=' min-h-screen w-full mx-auto flex justify-center items-center'>
        <Spinner />
      </div>
    );
  }
  return (
    <main>
      <Head>
        <title>Smart book - Weekly To Do List</title>
        <meta
          name='description'
          content='Add your weekly to dos to this calendar and never forget your tasks
          This schedule does not let people forget their weekly assignments. Add, edit, delete your tasks and get rid of weekly headaches!'
        />
      </Head>
      <RoutineHeader />
      <div className='flex flex-col '>
        <div className='overflow-x-auto sm:-mx-6 lg:-mx-8 '>
          <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='overflow-x-auto'>
              <table className='min-w-full '>
                {/* static menu */}
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                    >
                      Time
                    </th>
                    <th
                      scope='col'
                      className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                    >
                      Monday
                    </th>
                    <th
                      scope='col'
                      className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                    >
                      Tuesday
                    </th>
                    <th
                      scope='col'
                      className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                    >
                      Wednesday
                    </th>
                    <th
                      scope='col'
                      className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                    >
                      Thursday
                    </th>
                    <th
                      scope='col'
                      className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                    >
                      Friday
                    </th>
                    <th
                      scope='col'
                      className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                    >
                      Saturday
                    </th>
                    <th
                      scope='col'
                      className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                    >
                      Sunday
                    </th>
                  </tr>
                </thead>
                {/* dynamic routine menu */}
                <tbody>
                  {days &&
                    days.map((day: any) => {
                      return <Day popUpWindow={popUpWindow} key={Math.random()} day={day} />;
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* pop up menu */}
      {openPopUp ? (
        <PopUpdate
          setDataToUpdate={setDataToUpdate}
          dataToUpdate={dataToUpdate}
          popUpWindow={popUpWindow}
        />
      ) : null}
    </main>
  );
};

export default routine;
