import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { modalStyle } from './style';
import { TPROPS } from './type';
import ConfirmButton from '@components/button/confirm/index';
import CancelButton from '@components/button/cancel/index';

export default function AlertDialog(props: TPROPS) {
	return (
		<Dialog
			open={props.isOpen}
			onClose={() => {
				if (props.canSkip) props.onClose();
			}}
			style={modalStyle}
		>
			<DialogTitle>{props.title}</DialogTitle>

			<DialogContent>
				<DialogContentText>{props.msg}</DialogContentText>
			</DialogContent>

			<DialogActions>
				<CancelButton
					isLoading={props.isLoading}
					onClick={() => props.onClose()}
				/>

				<ConfirmButton
					isLoading={props.isLoading}
					onClick={() => props.onConfirm()}
				/>
			</DialogActions>
		</Dialog>
	);
}
