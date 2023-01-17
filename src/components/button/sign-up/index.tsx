import { Button } from '@mui/material';
import React from 'react';
import { buttonHoverStyle, buttonStyle } from './style';
import { TPROPS } from './type';

export default function Index(props: TPROPS) {
	const [isHover, setIsHover] = React.useState(false);

	return (
		<Button
			style={isHover ? buttonHoverStyle : buttonStyle}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			onClick={() => {
				props.onClick();
			}}
		>
			Sign up
		</Button>
	);
}
