import { TextField } from '@mui/material';
import { textField } from './style';
import { TProps } from './type';
import IconButton from '@mui/material/IconButton';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import React from 'react';

export default function Index(props: TProps) {
	const textType = 'text';
	const pwdType = 'password';
	const [isShowPwd, setIsShowPwd] = React.useState<boolean>(false);

	return (
		<div>
			<TextField
				variant='outlined'
				label={props.title}
				style={textField}
				onBlur={e => props.onBlur(e.target.value)}
				type={props.type ? (props.type === pwdType ? (isShowPwd ? textType : props.type) : props.type) : textType}
			/>
			<IconButton onClick={() => setIsShowPwd(!isShowPwd)}>
				{props.type === pwdType && (isShowPwd ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />)}
			</IconButton>
		</div>
	);
}
