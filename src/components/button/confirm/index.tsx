import { LoadingButton } from '@mui/lab';
import { confirmButtonStyle } from './style';
import { TProps } from '../type';
import { disabledButtonStyle } from '../style';

export default function index(props: TProps) {
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
