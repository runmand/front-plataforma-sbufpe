import { AppProps } from 'next/app';
import React from 'react';
import { SnackbarProvider } from 'notistack';
import '../styles/globals.css';
import '../src/css/index.css';
import '../src/css/login.css';
import '../src/css/register.css';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'src/core/theme';

//TODO: Botão para fechar o popup
export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<SnackbarProvider
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				maxSnack={3} //TODO: Deixar configuravel
			>
				<Component {...pageProps} />
			</SnackbarProvider>
		</ThemeProvider>
	);
}
