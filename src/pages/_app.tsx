// src/pages/_app.tsx
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../redux/store'; // Importa tu store

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;