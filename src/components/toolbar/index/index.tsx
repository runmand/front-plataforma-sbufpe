import { Toolbar } from '@mui/material';
import { buttonDividerStyle, toolbarStyle } from './style';
import LoginButton from '@components/log-in-button';
import SignupButton from '@components/sign-up-button';
import { TProps } from './type';

export default function Index(props: TProps) {
	<Toolbar style={toolbarStyle}>
		<LoginButton onClick={() => props.openLoginModal(true)} />

		<div style={buttonDividerStyle} />

		<SignupButton />
	</Toolbar>;
}
