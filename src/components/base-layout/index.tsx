import { Box } from '@mui/material';
import { baseBox } from './style';
import { TPROPS } from './type';

export default function Index(props: TPROPS) {
	return (
		<Box style={baseBox}>
			{props.appBarChild}
			{props.mainContainerChild}
			{props.footerChild}
		</Box>
	);
}
