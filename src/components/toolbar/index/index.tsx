import { Button, Toolbar } from '@mui/material';
import { buttonDividerStyle, toolbarStyle } from './style';
import LoginButton from '@components/button/log-in';
import SignupButton from '@components/button/sign-up';
import SimpleMenu from '@components/menu/simple-menu';
import { TProps } from './type';
import { titleStyle } from '@components/menu/simple-menu/style';

export default function Index(props: TProps) {
	return (
		<Toolbar style={toolbarStyle}>
			<div style={{ marginRight: '2rem', display: 'flex' }}>
				<Button
					onClick={() => props.onClickInitialButton()}
					style={titleStyle}
				>
					Início
				</Button>

				{props.menuList.map((menu, index) => (
					<div key={index}>
						<SimpleMenu
							title={menu.title}
							menuItems={menu.menuItems}
							onClick={() => (menu.onClick ? menu.onClick() : () => {})}
						/>
					</div>
				))}
			</div>

			<SignupButton onClick={() => props.openSignupModal()} />

			<div style={buttonDividerStyle} />

			<LoginButton onClick={() => props.openLoginModal()} />
		</Toolbar>
	);
}
