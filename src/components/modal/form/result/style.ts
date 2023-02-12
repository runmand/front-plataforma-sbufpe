import { CSSProperties } from 'react';
import { theme } from 'src/core/theme';

export const modalStyle: CSSProperties = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: theme.blur,
	transition: '0.6s',
};

export const cardStyle: CSSProperties = {
	backgroundColor: theme.white,
	borderRadius: theme.borderRadiusEdge,
	padding: theme.modal.card.padding,
	minWidth: theme.modal.card.minWidth,
};

export const cardBodyStyle: CSSProperties = {
	marginTop: '2rem',
	maxHeight: '30rem',
	maxWidth: '100rem',
	overflow: 'auto',
};

export const optionsStyle: CSSProperties = {
	display: 'flex',
	fontSize: '0.85rem',
	alignItems: 'end',
	marginTop: '0.25rem',
};

export const scoreStyle: CSSProperties = {
	fontSize: '1.5rem',
	textTransform: 'uppercase',
	color: theme.secundaryConfirm,
	fontWeight: 'bold',
};