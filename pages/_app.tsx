import { AppProps } from 'next/app';
import React from 'react';
import '../styles/globals.css';
import '../src/css/index.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
