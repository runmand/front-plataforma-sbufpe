import { CSSProperties } from 'react';
import { white } from 'src/core/colors';
import { theme } from 'src/core/theme';

export const toolbarStyle: CSSProperties = {
	width: '100%',
	backgroundColor: theme.secundaryColor,
	justifyContent: 'end',
	borderRadius: theme.borderRadiusEdge,
};

export const atualPageAreaStyle: CSSProperties = {
	display: 'flex',
	width: '100%',
	justifyContent: 'center',
};

export const atualPageTitleStyle: CSSProperties = {
	fontSize: '1.5rem',
	fontWeight: 'bold',
	color: white,
};
