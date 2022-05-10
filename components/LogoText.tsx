import Link from 'next/link';
import React from 'react';

const LogoText = () => {
  return (
    <Link href='/'>
      <h4 className='font-extrabold logo cursor-pointer  tracking-wider text-2xl font-mono text-white'>
        SmartBook
      </h4>
    </Link>
  );
};

export default LogoText;
