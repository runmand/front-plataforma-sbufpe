import { actionAreaStyle } from './style';
import { TPROPS } from './type';
import ConfirmButton from '@components/button/confirm';

export default function index(props: TPROPS) {
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
