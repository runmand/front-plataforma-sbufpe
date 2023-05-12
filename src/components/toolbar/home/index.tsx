import { IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { atualPageAreaStyle, atualPageTitleStyle, toolbarStyle } from './style';
import DrawerMenu from '@components/menu/drawer/index';
import React from 'react';
import { MENU_ITEM } from '@components/menu/items/type';
import { localStorageKeyEnum, routerEnum } from 'src/core/enums';
import { useRouter } from 'next/router';

export default function Index() {
	const router = useRouter();
	const [isDrawerMenuOpen, setIsDrawerMenuOpen] = React.useState<boolean>(false);

	//TODO: Remover o hardcode e buscar os menus verdadeiros
	const menu: MENU_ITEM[] = [
		{ id: 0, title: 'Questionário Inicial', url: routerEnum.QUESTION },
		{ id: 1, title: 'Questionários', url: routerEnum.FORM }
	];

	const handleLogout = () => {
		localStorage.removeItem(localStorageKeyEnum.TOKEN);
		router.push(routerEnum.INITIAL)

	}

	return (
	
		<Toolbar style={toolbarStyle}>
			<IconButton
				size='large'
				edge='start'
				color='inherit'
				aria-label='menu'
				sx={{ mr: 2 }}
				onClick={() => setIsDrawerMenuOpen(true)}
			>
				<MenuIcon />
			</IconButton>


			<div style={atualPageAreaStyle}>
				<Typography style={atualPageTitleStyle}>SB - UFPE</Typography>
			</div>

			<IconButton
				size='medium'
				aria-label='display more actions'
				edge='start'
				color='inherit'
				onClick={()=>handleLogout()}
			>
				<LogoutIcon /> Sair
			</IconButton>
			<DrawerMenu
				position='left'
				isOpen={isDrawerMenuOpen}
				menuItems={menu}
				onClose={() => setIsDrawerMenuOpen(false)}
			/>
		</Toolbar>
	);
}
