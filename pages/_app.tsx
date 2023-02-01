import { AppProps } from 'next/app';
import React from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import '../styles/globals.css';
import '../src/css/index.css';
import '../src/css/login.css';
import '../src/css/register.css';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'src/core/theme';
import { Button } from '@mui/material';


//TODO: Deixar configuravel
export default function MyApp({ Component, pageProps }: AppProps) {
	const buttonStyle = {
		color:theme.greyLight,
		fontWeight: theme.button.fontWeight
	}
	const DimissAction = () => {
		const {closeSnackbar} = useSnackbar()
		return(
			<Button
			style={buttonStyle} onClick={()=>closeSnackbar()}>Fechar</Button>
			)
	}
	return (
		<ThemeProvider theme={theme}>
			<SnackbarProvider
				action={<DimissAction/>}
				preventDuplicate
				autoHideDuration={1000}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<Component {...pageProps} />
			</SnackbarProvider>
		</ThemeProvider>
	);
}
