import { header, titleStyle } from './style';
import { TPROPS } from './type';
import { Typography } from '@mui/material';
import CloseButton from '@components/button/close/index';

export default function index(props: TPROPS) {
	return (
		<div style={header}>
			<Typography style={titleStyle}>{props.title}</Typography>
			<CloseButton onClick={() => props.onClose()} />
		</div>
	);
}
