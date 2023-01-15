import { CSSProperties } from 'react';
import { white } from 'src/core/colors';
import { theme } from 'src/core/theme';
import { buttonStyle } from '../style';

export const cancelButtonStyle: CSSProperties = {
	...buttonStyle,
	color: white,
	backgroundColor: theme.primaryCancel,
	borderColor: theme.secundaryCancel,
};
