import { TextField } from '@mui/material';
import { textField } from './style';
import { TProps } from './type';

//TODO: Implementar icon para ver senha caso seja um campo do tipo password
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
