import createTheme from '@mui/material/styles/createTheme';
import React from 'react';
import { black, blue, primaryColor, secundaryColor } from './colors';

declare module '@mui/material/styles' {
	interface Theme {
		primaryColor: React.CSSProperties['color'];
		secundaryColor: React.CSSProperties['color'];
		black: React.CSSProperties['color'];
		blue: React.CSSProperties['color'];
	}
	interface ThemeOptions {
		primaryColor: React.CSSProperties['color'];
		secundaryColor: React.CSSProperties['color'];
		black: React.CSSProperties['color'];
		blue: React.CSSProperties['color'];
	}
}

export const theme = createTheme({
	primaryColor: primaryColor,
	secundaryColor: secundaryColor,
	black: black,
	blue: blue,
});
