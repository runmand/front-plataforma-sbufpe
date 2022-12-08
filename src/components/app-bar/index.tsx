import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { TProps } from './type';
import { appbarStyle } from './style';

export default function Index(props: TProps) {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar style={appbarStyle}>{props.toolbarChild}</AppBar>
		</Box>
	);
}
