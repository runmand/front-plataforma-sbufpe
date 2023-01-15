import { CSSProperties } from 'react';
import { theme } from 'src/core/theme';

export const buttonStyle: CSSProperties = {
	color: theme.white,
	fontSize: '2rem',
	alignSelf: 'center',
	position: 'absolute',
	right: 0,
};

export const buttonHoverStyle: CSSProperties = {
	...buttonStyle,
	color: theme.hoverText,
	cursor: 'pointer',
};
