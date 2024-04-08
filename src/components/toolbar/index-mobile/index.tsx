import React from 'react';
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import LoginButton from '@components/button/log-in';
import SimpleMenu from '@components/menu/simple-menu';
import MenuIcon from '@mui/icons-material/Menu';
import { theme } from "src/core/theme";
import { TPROPS } from './type';

export default function Index (props: TPROPS){

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
      <Avatar alt="Logo de Odontologia" src="/logo-transparent.png" />
      <Box>
      <LoginButton 
					onClick={() => props.openLoginModal()} />
      <Button
        id="basic-button"
        color='inherit'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Button
          color='inherit'
          onClick={() => props.onClickInitialButton()}
          >
          Inicio
        </Button>
        {props.menuList.map((menu, index) => (
					<SimpleMenu
						key={index}
						title={menu.title}
						menuItems={menu.menuItems}
						onClick={() => (menu.onClick ? menu.onClick() : () => {})}
					/>
				))}

      </Menu>

      </Box>
     
      
        


    </Toolbar>
  )
}