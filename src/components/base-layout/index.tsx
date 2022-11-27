import { Box } from '@mui/material';
import { baseBox } from './style';
import { TProps } from './type';

export default function Index(props: TProps) {
	return (
		<Box style={baseBox}>
			{props.appBarChild}
			{props.mainContainerChild}
			{props.footerChild}
		</Box>
	);
}
