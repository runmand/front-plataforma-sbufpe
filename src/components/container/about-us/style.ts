import { CSSProperties } from 'react';
import { theme } from 'src/core/theme';

export const mainContainerStyle: CSSProperties = {
	backgroundColor: '#001E3C',
	paddingBottom: '10%',
};

export const titleStyle: CSSProperties = {
	color: theme.white,
	textAlign: 'center',
	fontWeight: 'bold',
	padding: '2%',
};

export const photoContainerStyle: CSSProperties = {
	display: 'grid',
	gridTemplateColumns: '20% 20% 20%',
	gridTemplateRows: 'auto',
	justifyContent: 'center',
};

export const photoCardStyle: CSSProperties = {
	margin: '1rem',
	border: `4px solid ${theme.primaryColor}`,
	borderRadius: '1rem',
};

export const photoStyle: CSSProperties = {
	borderRadius: '1rem',
};

export const photoBarStyle: CSSProperties = {
	borderRadius: '1rem',
	backgroundColor: theme.blur,
};

export const iconStyle: CSSProperties = {
	margin: '0.25rem',
	cursor: 'pointer',
};
