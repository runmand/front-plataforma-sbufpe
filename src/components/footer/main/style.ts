import { CSSProperties } from 'react';
import { theme } from 'src/core/theme';

export const subStyle: CSSProperties = {
	display: 'flex',
	justifyContent: 'center',
	padding: '1rem',
	backgroundColor: theme.secundaryColor,
};

export const linkStyle: CSSProperties = {
	color: theme.white,
	margin: '0.2rem',
	textDecoration: 'underline',
};

export const copyRightStyle: CSSProperties = {
	color: theme.white,
	margin: '0.2rem',
};
