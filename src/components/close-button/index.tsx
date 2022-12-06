import { TProps } from './type';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { buttonHoverStyle, buttonStyle } from './style';
import React from 'react';

export default function Index(props: TProps) {
	const [isHover, setIsHover] = React.useState(false);

	return (
		<HighlightOffIcon
			onClick={() => props.onClick()}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			style={isHover ? buttonHoverStyle : buttonStyle}
		/>
	);
}
