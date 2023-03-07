import { CSSProperties } from 'react';
import { theme } from 'src/core/theme';

export const appbarStyle: CSSProperties = {
	position: 'relative',
	width: '100%',
	height: '15%',
	display: 'flex',
	justifyContent: 'center',
	padding: '1rem',
	backgroundColor: theme.primaryColor,
};
