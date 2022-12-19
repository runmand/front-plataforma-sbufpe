import { TextField } from '@mui/material';
import { iconButtonStyle, textField, wrapperStyle } from './style';
import { TPROPS } from './type';
import IconButton from '@mui/material/IconButton';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import React from 'react';

export default function Index(props: TPROPS) {
	const textType = 'text';
	const pwdType = 'password';
	const [isShowPwd, setIsShowPwd] = React.useState<boolean>(false);

	return (
		<div style={wrapperStyle}>
			<TextField
				variant='outlined'
				label={props.title}
				style={textField}
				onBlur={e => props.onBlur(e.target.value)}
				type={props.type ? (props.type === pwdType ? (isShowPwd ? textType : props.type) : props.type) : textType}
			/>

			{props.type === pwdType && (
				<IconButton
					style={iconButtonStyle}
					onClick={() => setIsShowPwd(!isShowPwd)}
				>
					{isShowPwd ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
				</IconButton>
			)}
		</div>
	);
}
