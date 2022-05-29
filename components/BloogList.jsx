import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const actions = [
  {
    title: 'Top 5 places to visit in Spain',
    href: '/dashboard/blog/spain',
    id: 0,
    src: '/blog/0.jpg',
    description:
      '1. Barcelona is the country’s second city but it is Spain’s most popular destination for international visitors. It is a laid-back city which offers stunning coastlines combined with a wide range of things to see and do...',
  },
  {
    title: 'Top 5 places to visit in lithuania',
    href: '/dashboard/blog/lithuania',
    id: 1,
    src: '/blog/1.jpg',
    description:
      '1. Palanga has incredibal beach with wery soft sand, it allmost feels like you walk on clouds...',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function BloogList() {
  const imgRef = useRef(null);

  const hover = (target, id) => {
    gsap.to(target, { scale: 1, duration: 1 });
  };
  const onMouseLeave = (target, id) => {
    gsap.to(target, { scale: 1.1, duration: 1 });
  };

  return (
    <div
      ref={imgRef}
      className='rounded-lg cursor-pointer bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px'
    >
      {actions.map((action, actionIdx) => (
        <Link key={action.title} href={action.href}>
          <div
            onMouseEnter={() =>
              hover(imgRef.current.children[action.id].children[0].children, action.id)
            }
            onMouseLeave={() =>
              onMouseLeave(imgRef.current.children[action.id].children[0].children, action.id)
            }
            key={action.title}
            className={classNames(
              actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
              actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
              actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
              actionIdx === actions.length - 1
                ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
                : '',
              'relative group  bg-white p-6 focus-within:ring-2 hover:bg-slate-100 focus-within:ring-inset focus-within:ring-indigo-500'
            )}
          >
            <div className='overflow-hidden'>
              <img className='w-full animation  max-h-96 ' src={action.src} alt={action.title} />
            </div>

            <div className='mt-8'>
              <h3 className='text-lg font-medium'>
                <a className='focus:outline-none'>
                  {/* Extend touch target to entire panel */}
                  <span className='absolute inset-0' aria-hidden='true' />
                  {action.title}
                </a>
              </h3>
              <p className='mt-2 text-sm text-gray-500'>{action.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
