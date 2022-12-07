import { CSSProperties } from 'react';
import { blueDark, confirm, white } from 'src/core/colors';
import { buttonStyle } from '../style';

export const confirmButtonStyle: CSSProperties = {
	...buttonStyle,
	color: white,
	backgroundColor: confirm,
	borderColor: blueDark,
};
