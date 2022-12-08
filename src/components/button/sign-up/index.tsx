import Button from '@mui/material/Button/Button';
import React from 'react';
import { buttonHoverStyle, buttonStyle } from './style';
import { TProps } from './type';

export default function Index(props: TProps) {
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
