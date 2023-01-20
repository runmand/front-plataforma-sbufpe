import { createTheme } from '@mui/material/styles/';
import React from 'react';
import {
	black,
	blue,
	blur,
	primaryConfirm,
	secundaryConfirm,
	primaryCancel,
	secundaryCancel,
	green,
	grey,
	greyDark,
	greyLight,
	hoverText,
	primaryColor,
	secundaryColor,
	testColor,
	testColor02,
	transparent,
	white,
} from './colors';

declare module '@mui/material/styles' {
	interface Theme {
		primaryColor: React.CSSProperties['color'];
		secundaryColor: React.CSSProperties['color'];
		hoverText: React.CSSProperties['color'];
		transparent: React.CSSProperties['color'];
		blur: React.CSSProperties['color'];
		primaryConfirm: React.CSSProperties['color'];
		secundaryConfirm: React.CSSProperties['color'];
		primaryCancel: React.CSSProperties['color'];
		secundaryCancel: React.CSSProperties['color'];
		black: React.CSSProperties['color'];
		blue: React.CSSProperties['color'];
		green: React.CSSProperties['color'];
		white: React.CSSProperties['color'];
		grey: React.CSSProperties['color'];
		greyLight: React.CSSProperties['color'];
		borderRadiusEdge: React.CSSProperties['borderRadius'];
		borderRadiusSmooth: React.CSSProperties['borderRadius'];
		modal: {
			card: {
				padding: React.CSSProperties['padding'];
				minWidth: React.CSSProperties['minWidth'];
				header: {
					backgroundColor: React.CSSProperties['color'];
					border: {
						style: React.CSSProperties['borderStyle'];
						color: React.CSSProperties['color'];
						width: React.CSSProperties['borderWidth'];
					};
					title: {
						color: React.CSSProperties['color'];
						fontSize: React.CSSProperties['fontSize'];
						fontWeight: React.CSSProperties['fontWeight'];
					};
				};
			};
		};
		button: {
			padding: React.CSSProperties['padding'];
			fontSize: React.CSSProperties['fontSize'];
			fontWeight: React.CSSProperties['fontWeight'];
			minWidth: React.CSSProperties['minWidth'];
			minHeight: React.CSSProperties['minHeight'];
			height: React.CSSProperties['height'];
			backgroundColor: React.CSSProperties['color'];
			color: React.CSSProperties['color'];
			border: React.CSSProperties['border'];
			disabled: {
				color: React.CSSProperties['color'];
				backgroundColor: React.CSSProperties['color'];
				border: {
					color: React.CSSProperties['color'];
				};
			};
		};
		menus: {
			drawer: {
				incrementalLeftChildMargin: number;
			};
		};
	}
	interface ThemeOptions {
		primaryColor: React.CSSProperties['color'];
		secundaryColor: React.CSSProperties['color'];
		hoverText: React.CSSProperties['color'];
		transparent: React.CSSProperties['color'];
		blur: React.CSSProperties['color'];
		primaryConfirm: React.CSSProperties['color'];
		secundaryConfirm: React.CSSProperties['color'];
		primaryCancel: React.CSSProperties['color'];
		secundaryCancel: React.CSSProperties['color'];
		black: React.CSSProperties['color'];
		blue: React.CSSProperties['color'];
		green: React.CSSProperties['color'];
		white: React.CSSProperties['color'];
		grey: React.CSSProperties['color'];
		greyLight: React.CSSProperties['color'];
		borderRadiusEdge: React.CSSProperties['borderRadius'];
		borderRadiusSmooth: React.CSSProperties['borderRadius'];
		modal: {
			card: {
				padding: React.CSSProperties['padding'];
				minWidth: React.CSSProperties['minWidth'];
				header: {
					backgroundColor: React.CSSProperties['color'];
					border: {
						style: React.CSSProperties['borderStyle'];
						color: React.CSSProperties['color'];
						width: React.CSSProperties['borderWidth'];
					};
					title: {
						color: React.CSSProperties['color'];
						fontSize: React.CSSProperties['fontSize'];
						fontWeight: React.CSSProperties['fontWeight'];
					};
				};
			};
		};
		button: {
			padding: React.CSSProperties['padding'];
			fontSize: React.CSSProperties['fontSize'];
			fontWeight: React.CSSProperties['fontWeight'];
			minWidth: React.CSSProperties['minWidth'];
			minHeight: React.CSSProperties['minHeight'];
			height: React.CSSProperties['height'];
			backgroundColor: React.CSSProperties['color'];
			color: React.CSSProperties['color'];
			border: React.CSSProperties['border'];
			disabled: {
				color: React.CSSProperties['color'];
				backgroundColor: React.CSSProperties['color'];
				border: {
					color: React.CSSProperties['color'];
				};
			};
		};
		menus: {
			drawer: {
				incrementalLeftChildMargin: number;
			};
		};
	}
}

export const theme = createTheme({
	primaryColor: primaryColor,
	secundaryColor: secundaryColor,
	hoverText: hoverText,
	transparent: transparent,
	blur: blur,
	primaryConfirm: primaryConfirm,
	secundaryConfirm: secundaryConfirm,
	primaryCancel: primaryCancel,
	secundaryCancel: secundaryCancel,
	black: black,
	blue: blue,
	green: green,
	white: white,
	grey: grey,
	greyLight: greyLight,
	borderRadiusEdge: '0.25rem',
	borderRadiusSmooth: '0.5rem',
	modal: {
		card: {
			padding: '1rem',
			minWidth: '25%',
			header: {
				backgroundColor: secundaryColor,
				title: {
					color: white,
					fontSize: '1.3rem',
					fontWeight: 'bold',
				},
				border: {
					style: 'solid',
					color: primaryColor,
					width: '0.2rem',
				},
			},
		},
	},
	button: {
		padding: '1rem',
		fontSize: '1rem',
		fontWeight: 'bold',
		minWidth: '10rem',
		minHeight: '1rem',
		height: '2rem',
		color: testColor,
		backgroundColor: testColor02,
		border: `0.2rem outset ${testColor}`,
		disabled: {
			color: greyDark,
			backgroundColor: greyLight,
			border: {
				color: grey,
			},
		},
	},
	menus: {
		drawer: {
			incrementalLeftChildMargin: 1,
		},
	},
});
