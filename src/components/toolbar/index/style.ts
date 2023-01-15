import { CSSProperties } from 'react';
import { theme } from 'src/core/theme';

export const toolbarStyle: CSSProperties = {
	width: '100%',
	backgroundColor: theme.secundaryColor,
	justifyContent: 'end',
	borderRadius: theme.borderRadiusEdge,
};

export const buttonDividerStyle: CSSProperties = {
	width: '0.05rem',
	height: '70%',
	backgroundColor: theme.primaryColor,
};
