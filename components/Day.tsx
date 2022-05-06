import React from 'react';

type Props = {
  day: any;
  popUpWindow: (params: string, dataFromScreen: any) => void;
};

const Day = ({ day, popUpWindow }: Props) => {
  return (
    <tr className='border-b max-w-full'>
      {/* time */}

      <td className='px-2 py-4  text-sm font-medium text-gray-900 max-w-2rem min-w-fit '>
        {day.time}
      </td>

      {/* monday */}

      <td
        onClick={() =>
          popUpWindow('pop', {
            time: day.time,
            day: day.monday.day,
            message: day.monday.message,
            id: day.monday.id,
          })
        }
        className={`text-xs lg:text-base text-stone-900 font-normal px-6 py-4
        order-slate-200 border-2
        relative min-w-fit max-w-2rem 
        ${day.monday.message && 'bg-slate-200 '}
        `}
      >
        {day.monday.message}
        <span className='absolute right-0 top-0 text-xs text-gray-500 '>{day.time} - M</span>
      </td>

      {/* tuesday */}

      <td
        onClick={() =>
          popUpWindow('pop', {
            time: day.time,
            day: day.tuesday.day,
            message: day.tuesday.message,
            id: day.tuesday.id,
          })
        }
        className={`text-xs lg:text-base text-stone-900 font-normal px-6 py-4
                      order-slate-200 border-2
                      relative min-w-fit max-w-2rem 
        ${day.tuesday.message && 'bg-slate-200'}
        `}
      >
        {day.tuesday.message}
        <span className='absolute right-0 top-0 text-xs text-gray-500 '>{day.time} - Tu</span>
      </td>

      {/* wendesday */}

      <td
        onClick={() =>
          popUpWindow('pop', {
            time: day.time,
            day: day.wendesday.day,
            message: day.wendesday.message,
            id: day.wendesday.id,
          })
        }
        className={`text-xs lg:text-base text-stone-900 font-normal px-6 py-4
                      order-slate-200 border-2
                      relative min-w-fit max-w-2rem 
        ${day.wendesday.message && 'bg-slate-200'}
                      `}
      >
        {day.wendesday.message}
        <span className='absolute right-0 top-0 text-xs text-gray-500'>{day.time} - W</span>
      </td>

      {/* thursday */}

      <td
        onClick={() =>
          popUpWindow('pop', {
            time: day.time,
            day: day.thursday.day,
            message: day.thursday.message,
            id: day.thursday.id,
          })
        }
        className={`text-xs lg:text-base text-stone-900 font-normal px-6 py-4
                      order-slate-200 border-2
                      relative min-w-fit max-w-2rem 
        ${day.thursday.message && 'bg-slate-200'}
                      `}
      >
        {day.thursday.message}
        <span className='absolute right-0 top-0 text-xs text-gray-500 '>{day.time} - Th</span>
      </td>

      {/* friday */}

      <td
        onClick={() =>
          popUpWindow('pop', {
            time: day.time,
            day: day.friday.day,
            message: day.friday.message,
            id: day.friday.id,
          })
        }
        className={`text-xs lg:text-base text-stone-900 font-normal px-6 py-4
                      order-slate-200 border-2
                      relative min-w-fit max-w-2rem 
        ${day.friday.message && 'bg-slate-200'}
                      `}
      >
        {day.friday.message}
        <span className='absolute right-0 top-0 text-xs text-gray-500 '>{day.time} - F</span>
      </td>

      {/* saturday */}

      <td
        onClick={() =>
          popUpWindow('pop', {
            time: day.time,
            day: day.saturday.day,
            message: day.saturday.message,
            id: day.saturday.id,
          })
        }
        className={`text-xs lg:text-base text-stone-900 font-normal px-6 py-4
                      order-slate-200 border-2
                      relative min-w-fit max-w-2rem 
        ${day.saturday.message && 'bg-slate-200'}
                      `}
      >
        {day.saturday.message}
        <span className='absolute right-0 top-0 text-xs text-gray-500 '>{day.time} - Sa</span>
      </td>

      {/* sunday */}

      <td
        onClick={() =>
          popUpWindow('pop', {
            time: day.time,
            day: day.sunday.day,
            message: day.sunday.message,
            id: day.sunday.id,
          })
        }
        className={`text-xs lg:text-base text-stone-900 font-normal px-6 py-4
                      order-slate-200 border-2
                      relative min-w-fit max-w-2rem 
        ${day.sunday.message && 'bg-slate-200'}
                      `}
      >
        {day.sunday.message}
        <span className='absolute right-0 top-0 text-xs text-gray-500 '>{day.time} - Su</span>
      </td>
    </tr>
  );
};

export default Day;
