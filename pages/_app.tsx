import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Layout from '../components/Layout';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout title='best to do app plus 7 days calendar'>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
