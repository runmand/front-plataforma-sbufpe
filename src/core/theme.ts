import createTheme from '@mui/material/styles/createTheme';
import React from 'react';
import { black, blue, green, hoverText, primaryColor, secundaryColor, transparent, white } from './colors';

declare module '@mui/material/styles' {
	interface Theme {
		primaryColor: React.CSSProperties['color'];
		secundaryColor: React.CSSProperties['color'];
		hoverText: React.CSSProperties['color'];
		transparent: React.CSSProperties['color'];
		black: React.CSSProperties['color'];
		blue: React.CSSProperties['color'];
		green: React.CSSProperties['color'];
		white: React.CSSProperties['color'];
	}
	interface ThemeOptions {
		primaryColor: React.CSSProperties['color'];
		secundaryColor: React.CSSProperties['color'];
		hoverText: React.CSSProperties['color'];
		transparent: React.CSSProperties['color'];
		black: React.CSSProperties['color'];
		blue: React.CSSProperties['color'];
		green: React.CSSProperties['color'];
		white: React.CSSProperties['color'];
	}
}

export const theme = createTheme({
	primaryColor: primaryColor,
	secundaryColor: secundaryColor,
	hoverText: hoverText,
	transparent: transparent,
	black: black,
	blue: blue,
	green: green,
	white: white,
});
