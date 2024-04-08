import { 
	Avatar,
	Box,
	Button,
	Toolbar } from '@mui/material';

import LoginButton from '@components/button/log-in';

import SimpleMenu from '@components/menu/simple-menu';
import { TProps } from './type';
import { theme } from 'src/core/theme';

export default function Index(props: TProps) {
	return (
		<Toolbar 
			sx={{
				width: '100%',
				display:'flex',
				flexWrap:'wrap',
				backgroundColor: theme.secundaryColor,
				justifyContent:'space-between',
				borderRadius: theme.borderRadiusEdge,
				
			}}
		>
			<Avatar alt="Logo de Odontologia" src="/logo-transparent.png" />
			<Box
				sx={{
					display:'flex',
					flexWrap:'wrap',
					alignItems:'center',
					justifyContent:'center'}}>
				<Button
					onClick={() => props.onClickInitialButton()}
					sx={{
						fontWeight: 'bold',
						color: theme.white,}}
				>
					Início
				</Button>
				{props.menuList.map((menu, index) => (
					<SimpleMenu
						key={index}
						title={menu.title}
						menuItems={menu.menuItems}
						onClick={() => (menu.onClick ? menu.onClick() : () => {})}
					/>
				))}
				<LoginButton 
					onClick={() => props.openLoginModal()} />
				</Box>
		</Toolbar>
	);
}
