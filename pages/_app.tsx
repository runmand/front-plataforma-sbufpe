import { AppProps } from 'next/app';
import React from 'react';
import { SnackbarProvider } from 'notistack';
import '../styles/globals.css';
import '../src/css/index.css';
import '../src/css/login.css';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SnackbarProvider
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			maxSnack={3}
		>
			<Component {...pageProps} />
		</SnackbarProvider>
	);
}
