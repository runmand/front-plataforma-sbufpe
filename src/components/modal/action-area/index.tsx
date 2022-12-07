import { actionAreaStyle } from './style';
import { TProps } from './type';
import ConfirmButton from '@components/button/confirm';

export default function index(props: TProps) {
	return (
		<div style={actionAreaStyle}>
			{props.onConfirm && (
				<ConfirmButton
					onClick={() => props.onConfirm()}
					isLoading={props.isLoading}
				/>
			)}
		</div>
	);
}
