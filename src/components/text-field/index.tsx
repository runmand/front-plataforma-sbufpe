import { TextField } from '@mui/material';
import { textField } from './style';
import { TProps } from './type';

export default function index(props: TProps) {
	return (
		<TextField
			variant='outlined'
			label={props.title}
			style={textField}
			onBlur={e => props.onBlur(e.target.value)}
			type={props.type || 'text'}
		/>
	);
}
