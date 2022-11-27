import { Box } from '@mui/material';
import { baseBox } from './style';
import { TProps } from './type';
import AppBar from '@components/app-bar/index';

export default function Index(props: TProps) {
	return (
		<Box style={baseBox}>
			<AppBar />
			{/* <Image alt="" style={imgLogo}/> */}
		</Box>
	);
}
