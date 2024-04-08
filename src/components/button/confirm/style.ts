import { CSSProperties } from 'react';
import { primaryConfirm, secundaryConfirm, white } from 'src/core/colors';
import { buttonStyle } from '../style';

export const confirmButtonStyle: CSSProperties = {
	...buttonStyle,
	color: white,
	backgroundColor: primaryConfirm,
	borderColor: secundaryConfirm,
};
