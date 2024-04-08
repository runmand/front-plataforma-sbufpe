import { CSSProperties } from 'react';
import { theme } from 'src/core/theme';

export const modalStyle: CSSProperties = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: theme.blur,
	transition: '0.6s',
	color:theme.primaryColor
};

export const cardStyle: CSSProperties = {
	backgroundColor: theme.white,
	borderRadius: theme.borderRadiusEdge,
	padding: theme.modal.card.padding,
	minWidth: theme.modal.card.minWidth,
};

export const cardBodyStyle: CSSProperties = {
	marginTop: '2rem',
};

export const optionsStyle: CSSProperties = {
	display: 'flex',
	fontSize: '0.85rem',
	alignItems: 'end',
	marginTop: '0.25rem',
	
};

export const optionsLinkStyle: CSSProperties = {
	fontSize: '0.85rem',
	textTransform: 'uppercase',
	color: theme.secundaryConfirm,
	fontWeight: 'bold',
	cursor: 'pointer',

};
