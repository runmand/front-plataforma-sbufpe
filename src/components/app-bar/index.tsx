import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { TPROPS } from './type';
import { appbarStyle } from './style';

export default function Index(props: TPROPS) {
	return <AppBar style={appbarStyle}>{props.toolbarChild}</AppBar>;
}
