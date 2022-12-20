import { CSSProperties } from 'react';
import { theme } from 'src/core/theme';

export const mainContainerStyle: CSSProperties = {
	display: 'grid',
	gridTemplateColumns: '20% 20% 20% 20% 20%',
	gridTemplateRows: 'auto',
};

export const formButtonStyle: CSSProperties = {
	...theme.button,
	backgroundColor: theme.primaryColor,
	color: theme.white,
	margin: '1rem',
	borderWidth: '0.5rem',
	borderColor: theme.secundaryColor,
};
