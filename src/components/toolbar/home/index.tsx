import { IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import { atualPageAreaStyle, atualPageTitleStyle, toolbarStyle } from './style';
import DrawerMenu from '@components/menu/drawer/index';
import React from 'react';
import { MENU_ITEM } from '@components/menu/items/type';
import { routerEnum } from 'src/core/enums';

export default function Index() {
	const [isDrawerMenuOpen, setIsDrawerMenuOpen] = React.useState<boolean>(false);
	//TODO: Remover o hardcode e buscar os menus verdadeiros
	const menu: MENU_ITEM[] = [
		{ id: 0, title: 'Questionários', url: routerEnum.FORM },
		{ id: 1, title: 'Questionário Inicial', url: routerEnum.QUESTION }
		
	];

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
				size='large'
				aria-label='display more actions'
				edge='end'
				color='inherit'
			>
				<MoreIcon />
			</IconButton>

			<DrawerMenu
				isOpen={isDrawerMenuOpen}
				menuItems={menu}
				onClose={() => setIsDrawerMenuOpen(false)}
			/>
		</Toolbar>
	);
}
