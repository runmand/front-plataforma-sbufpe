import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { TPROPS } from './type';
import { theme } from 'src/core/theme';

export default function Index(props: TPROPS) {
	return <AppBar 
		sx={{
			position: 'fixed',
			width: '100%',
			height: '12%',
			display: 'flex',
			padding:'0.75rem',
			justifyContent: 'center',
			backgroundColor: theme.primaryColor,}}>{props.toolbarChild}</AppBar>;
}
