import { LoadingButton } from '@mui/lab';
import { confirmButtonStyle } from './style';
import { TPROPS } from '../type';
import { disabledButtonStyle } from '../style';

export default function Index(props: TPROPS) {
	return (
		<LoadingButton
			onClick={() => props.onClick()}
			style={props.isLoading ? disabledButtonStyle(confirmButtonStyle) : confirmButtonStyle}
			loading={props.isLoading}
			disabled={props.isLoading}
		>
			{props.isLoading ? '' : 'Confirmar'}
		</LoadingButton>
	);
}
