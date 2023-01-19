import { CSSProperties } from 'react';
import { theme } from 'src/core/theme';

export const buttonStyle: CSSProperties = {
	color: theme.white,
	fontSize: '1.1rem',
	fontWeight: 'bold',
	transition: '0.3s',
};

export const buttonHoverStyle: CSSProperties = {
	color: theme.hoverText,
	fontSize: '1.5rem',
	fontWeight: 'bold',
	transition: '0.3s',
	backgroundColor: theme.transparent,
};