import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { modalStyle, titleStyle } from './style';
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
			<DialogTitle style={titleStyle}>{props.title}</DialogTitle>

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
