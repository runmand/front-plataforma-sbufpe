import { 
	Avatar,
	Box,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	useMediaQuery, } from '@mui/material';
import { theme } from 'src/core/theme';
import React, { CSSProperties, useEffect, useState } from 'react';
import {localStorageKeyEnum, routerEnum, titleEnumPtBr } from 'src/core/enums';
import { itemsMenu } from '../itensMenu';
import SimpleMenu from "../buttonMenu/index";
import { white } from 'src/core/colors';
import MenuIcon from "@mui/icons-material/Menu";
import DrawerMenu from "@components/menu/drawer/index";
import LoginModal from "../login/index"
import { MENU_ITEM } from '@components/menu/items/type';
import {itemsDrawer} from '../itensMenu'
import LogoutButton from "../logout/index"
import MenuMobile from "../menuMobile/index"

export const atualPageTitleStyle: CSSProperties = {
	fontSize: '1.5rem',
	fontWeight: 'bold',
	color: white,
	margin: 'auto',
};

export default function Index() {
	const [haveLogin, setHaveLogin] = React.useState<boolean>(false);
	const [isDrawerMenuOpen, setIsDrawerMenuOpen] = React.useState<boolean>(false);
	const [menu, setMenu] = React.useState<MENU_ITEM[]>(itemsDrawer);
	const largeQuery = useMediaQuery('(min-width:720px)');

	//Colocar o Exportar dados baseado no tipo de usuario
	useEffect(() => {
    const id = Number(localStorage.getItem("typeId"));

    if (id <= 2) {
      // Atualiza o estado do menu usando setMenu
      setMenu(prevMenu => [
        ...prevMenu,
        { id: 7, title: "Nossos Dados: Exportar", url: routerEnum.DATA },
		{ id: 8, title: "Nossos Dados: Exportar Planeja SD", url: routerEnum.DATAFORM }
      ]);
    }
  }, []);



	useEffect(() => {
		setHaveLogin(localStorage.getItem(localStorageKeyEnum.TOKEN)?.length > 0);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return(
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
			{!haveLogin? (
				<Avatar alt="GestBucal SD" src="/logo-transparent.png" />
			):
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2 }}
					onClick={() => setIsDrawerMenuOpen(true)}>
						<MenuIcon />
				</IconButton>
			}

			<Box
				sx={{
					display:'flex',
					flexWrap:'wrap',
					alignItems:'center',
					justifyContent:'center',
					}}>
					{largeQuery ? (
						itemsMenu.map((item, index) => (
							<SimpleMenu key={index} element={item} />
						))
					) : <></>}


					{!haveLogin? (
						<LoginModal/>
					): 
						<LogoutButton/>
					}

					{!largeQuery ? (
						<MenuMobile/>
					): <></>}
					
					<DrawerMenu
						isOpen={isDrawerMenuOpen}
						menuItems={menu}
						onClose={() => setIsDrawerMenuOpen(false)}
      		/>
				</Box>
		</Toolbar>
	);
}
