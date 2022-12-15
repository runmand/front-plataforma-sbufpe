import { Toolbar } from '@mui/material';
import { buttonDividerStyle, toolbarStyle } from './style';
import LoginButton from '@components/button/log-in';
import SignupButton from '@components/button/sign-up';
import { TProps } from './type';

export default function Index(props: TProps) {
	return (
		<Toolbar style={toolbarStyle}>
			<SignupButton onClick={() => props.openLoginModal()} />
			<div style={buttonDividerStyle} />
			<LoginButton onClick={() => props.openLoginModal()} />
		</Toolbar>
	);
}
