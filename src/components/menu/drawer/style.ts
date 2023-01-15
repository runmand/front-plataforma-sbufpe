import { CSSProperties } from 'react';
import { theme } from 'src/core/theme';

export const modalStyle: CSSProperties = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: theme.blur,
	transition: '0.6s',
};
