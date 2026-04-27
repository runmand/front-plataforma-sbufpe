'use client';

import React from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import { theme } from 'src/core/theme';

function DismissAction() {
	const { closeSnackbar } = useSnackbar();

	return (
		<Button
			style={{ color: theme.greyLight, fontWeight: theme.button.fontWeight }}
			onClick={() => closeSnackbar()}
		>
			Fechar
		</Button>
	);
}

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider theme={theme}>
			<SnackbarProvider
				action={<DismissAction />}
				preventDuplicate
				autoHideDuration={1000}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				{children}
			</SnackbarProvider>
		</ThemeProvider>
	);
}
