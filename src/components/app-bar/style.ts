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
