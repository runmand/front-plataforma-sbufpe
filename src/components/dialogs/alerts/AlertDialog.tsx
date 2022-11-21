import { LoadingButton } from '@mui/lab';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { IProps } from './contract';

export default function AlertDialog(props: IProps) {
	return (
		<Dialog
			open={props.isOpen}
			onClose={() => {
				if (props.canSkip) props.onClose();
			}}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
			style={{ backgroundColor: '#000000AA' }}
		>
			<DialogTitle id='alert-dialog-title'>{props.title}</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>{props.msg}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<LoadingButton
					loading={props.isLoading}
					onClick={() => {
						props.onClose();
					}}
				>
					Fechar
				</LoadingButton>
				<LoadingButton
					loading={props.isLoading}
					onClick={() => {
						props.onConfirm();
					}}
					autoFocus
				>
					Confirmar
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
}
