import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { modalStyle, titleStyle } from './style';
import { TPROPS } from './type';
import ConfirmButton from '@components/button/confirm/index';
import CancelButton from '@components/button/cancel/index';

export default function AlertDialog(props: TPROPS) {
	const handleOnCancel = () => {
		props.onCancel();
		props.onClose();
	};

	return (
		<Dialog
			open={props.isOpen}
			onClose={() => {
				if (props.canSkip) props.onClose();
			}}
			style={modalStyle}
		>
			<DialogTitle style={titleStyle}>{props.title}</DialogTitle>

			<DialogContent>
				<DialogContentText>{props.msg}</DialogContentText>
			</DialogContent>

			<DialogActions>
				{props.onCancel && <CancelButton isLoading={props.isLoading} onClick={() => handleOnCancel()} />}

				{props.onConfirm && <ConfirmButton isLoading={props.isLoading} onClick={() => props.onConfirm()} />}
			</DialogActions>
		</Dialog>
	);
}
