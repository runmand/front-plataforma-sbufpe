import { TextField } from '@mui/material';
import { IProps } from './contract';

export default function OpenAnswer(props: IProps) {
	return (
		<TextField
			id='outlined-basic'
			variant='outlined'
			style={{ display: 'flex', backgroundColor: 'wheat', borderRadius: '16px' }}
			onBlur={e => props.onChange(e, e.target.value)}
		/>
	);
}
