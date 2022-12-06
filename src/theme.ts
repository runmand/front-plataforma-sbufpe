import createTheme from '@mui/material/styles/createTheme';
import React from 'react';
import { primaryColor, secundaryColor } from './core/colors';

declare module '@mui/material/styles' {
	interface Theme {
		primaryColor: React.CSSProperties['color'];
		secundaryColor: React.CSSProperties['color'];
	}
	interface ThemeOptions {
		primaryColor: React.CSSProperties['color'];
		secundaryColor: React.CSSProperties['color'];
	}
}

export const theme = createTheme({
	primaryColor: primaryColor,
	secundaryColor: secundaryColor,
});
