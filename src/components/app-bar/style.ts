import { CSSProperties } from 'react';
import { theme } from 'src/core/theme';

export const appbarStyle: CSSProperties = {
	position: 'fixed',
	top: 0,
	left: 0,
	width: '100%',
	height: '10%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '1rem',
	transition: '0.6s',
	backgroundColor: theme.primaryColor,
	zIndex: '999',
};

export const toolbarStyle: CSSProperties = {
	width: '100%',
	backgroundColor: theme.secundaryColor,
	justifyContent: 'end',
	borderRadius: theme.borderRadiusEdge,
};

export const buttonDividerStyle: CSSProperties = {
	width: '0.05rem',
	height: '70%',
	backgroundColor: theme.primaryColor,
};
