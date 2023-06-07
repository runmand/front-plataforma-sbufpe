import { CSSProperties } from 'react';
import { theme } from 'src/core/theme';

export const mainContainerStyle: CSSProperties = {
	marginTop: '5rem',
	display: 'flex',
	flexWrap: 'wrap'
};

export const formButtonStyle: CSSProperties = {
	...theme.button,
	backgroundColor: theme.primaryColor,
	color: theme.white,
	width: '200px',
	margin: '1rem',
  height: 'auto',
	borderWidth: '0.5rem',
	borderColor: theme.secundaryColor,
};
