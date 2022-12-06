import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { TProps } from './type';
import ButtonGroup from '@mui/material/ButtonGroup/ButtonGroup';
import { appbarStyle, toolbarStyle } from './style';

export default function Index(props: TProps) {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar style={appbarStyle}>
				<Toolbar style={toolbarStyle}>
					<ButtonGroup
						variant='text'
						aria-label='text secundary button group'
					>
						{props.signupButtonChild}
						{props.loginButtonChild}
					</ButtonGroup>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
