import { Typography } from '@mui/material';
import { wrapperStyle } from './style';
import { TPROPS } from './type';

export default function Index(props: TPROPS) {
	return (
		<div style={wrapperStyle}>
			<Typography variant='h3'>{props.msg}</Typography>
		</div>
	);
}
