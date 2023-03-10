import { CSSProperties } from 'react';
import { theme } from 'src/core/theme';

export const mainContainerStyle: CSSProperties = {
	backgroundColor: theme.secundaryColor,
	backgroundImage: "url('/our-team-background.png')",
	WebkitBackgroundSize: '100%',
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
	border: `4px solid ${theme.black}`,
};



export const iconStyle: CSSProperties = {
	margin: '0.25rem',
	cursor: 'pointer',
};
