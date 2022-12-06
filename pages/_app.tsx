import { AppProps } from 'next/app';
import React from 'react';
import { SnackbarProvider } from 'notistack';
import '../styles/globals.css';
import '../src/css/index.css';
import '../src/css/login.css';
import '../src/css/register.css';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'src/theme';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<SnackbarProvider
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				maxSnack={3}
			>
				<Component {...pageProps} />
			</SnackbarProvider>
		</ThemeProvider>
	);
}
