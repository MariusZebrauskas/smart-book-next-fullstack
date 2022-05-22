import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Nav from './Nav';
import Footer from './Footer';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta name="msvalidate.01" content="B3371E29B67ECC79A11DBE0D39EA8A13" />
      <meta name='google-site-verification' content='FSbc7OjI9qdbeIqDu4MUbCFF8cTnNAd-Mgp-H5JVcnk' />
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      {/* <link rel="icon" href="/favicon.ico" /> */}
    </Head>
    <header>
      <Nav />
    </header>
    {children}
    <Footer />
  </div>
);

export default Layout;
