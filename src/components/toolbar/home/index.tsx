import { IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import { atualPageAreaStyle, atualPageTitleStyle, toolbarStyle } from './style';
import DrawerMenu from '@components/menu/drawer/index';
import React from 'react';
import { TMenuItem } from '@components/menu/items/type';

export default function Index() {
	const [isDrawerMenuOpen, setIsDrawerMenuOpen] = React.useState<boolean>(false);
	//TODO: Remover o hardcode e buscar os menus verdadeiros
	const temp: TMenuItem[] = [
		{ id: 0, title: 'Questionarios', url: '/AnswerForm' },
		{
			id: 1,
			title: 'Pai 1',
			url: '/AnswerForm',
			menuItemChildren: [
				{ id: 11, title: 'Filho 11', url: '/AnswerForm', menuItemChildren: [{ id: 111, title: 'Neto 111', url: '/AnswerForm' }] },
				{ id: 12, title: 'Filho 12', url: '/AnswerForm' },
			],
		},
		{
			id: 2,
			title: 'Pai 2',
			url: '/AnswerForm',
			menuItemChildren: [{ id: 21, title: 'Filho 21', url: '/AnswerForm' }],
		},
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
				menuItems={temp}
				onClose={() => setIsDrawerMenuOpen(false)}
			/>
		</Toolbar>
	);
}
