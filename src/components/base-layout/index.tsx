import { Box } from '@mui/material';
import { TPROPS } from './type';
import { useEffect, useRef } from 'react';

export default function Index(props: TPROPS) {
	useEffect(() =>{
		document.body.style.overflow = 'auto'
	}, []) 
	
	return (
		<Box 
		sx={props?.style}>
			{props.appBarChild}
			{props.mainContainerChild}
			{props.footerChild}
		</Box>
	);
}
