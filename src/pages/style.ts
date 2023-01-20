import { CSSProperties } from 'react';
import { theme } from 'src/core/theme';

export const carouselStyle: CSSProperties = {
	display: 'flex',
	justifyContent: 'center',
	backgroundColor: theme.greyLight,
	padding: '5rem',
};

export const infoStyle: CSSProperties = { display: 'flex', justifyContent: 'center', backgroundColor: theme.greyLight };
export const listTitleStyle: CSSProperties = { fontWeight: 'bold', margin: '1rem 2rem 1rem 2rem' };
export const listStyle: CSSProperties = { margin: '1rem 0rem 0rem 0rem' };
export const listItemStyle: CSSProperties = { margin: '0.25rem 0rem 0rem 0rem' };
