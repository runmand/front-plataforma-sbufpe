import { CSSProperties } from 'react';
import { theme } from 'src/core/theme';

export const header: CSSProperties = {
	display: 'flex',
	position: 'relative',
	justifyContent: 'center',
	backgroundColor: theme.modal.card.header.backgroundColor,
	borderRadius: theme.borderRadiusSmooth,
	borderStyle: theme.modal.card.header.border.style,
	borderWidth: theme.modal.card.header.border.width,
	borderColor: theme.modal.card.header.border.color,
};

export const titleStyle: CSSProperties = {
	color: theme.modal.card.header.title.color,
	fontSize: theme.modal.card.header.title.fontSize,
	fontWeight: theme.modal.card.header.title.fontWeight,
};
