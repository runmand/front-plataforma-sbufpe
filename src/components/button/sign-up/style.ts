import { CSSProperties } from 'react';
import { theme } from 'src/core/theme';

export const buttonStyle: CSSProperties = {
	color: theme.white,
	fontSize: '1rem',
	fontWeight: 'bold',
	transition: '0.3s',
};

export const buttonHoverStyle: CSSProperties = {
	border:'white 1px solid',
	fontSize:'1.1rem',
	fontWeight: 'bold',
	transition: '0.3s',
	color:theme.primaryColor,
	backgroundColor: theme.white,
};
