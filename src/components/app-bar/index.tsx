import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { TProps } from './type';
import { appbarStyle, buttonDividerStyle, toolbarStyle } from './style';

export default function Index(props: TProps) {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar style={appbarStyle}>
				<Toolbar style={toolbarStyle}>
					{props.signupButtonChild}

					<div style={buttonDividerStyle} />

					{props.loginButtonChild}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
