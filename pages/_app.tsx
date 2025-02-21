import '../styles/globals.css';
import '@pqina/pintura/pintura.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { CartProvider } from '../context/CartContext';
import { PhotoBookProvider } from '../context/PhotoBookContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <CartProvider>
        <PhotoBookProvider>
          <Component {...pageProps} />
        </PhotoBookProvider>
      </CartProvider>
    </SessionProvider>
  );
}

export default MyApp;
