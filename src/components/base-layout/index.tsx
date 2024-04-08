import { Box } from '@mui/material';
import { TPROPS } from './type';

export default function Index(props: TPROPS) {
	return (
		<Box 
		sx={{
			width: 1,
			height: 1
		}}>
			{props.appBarChild}
			{props.mainContainerChild}
			{props.footerChild}
		</Box>
	);
}
