import React, { useEffect } from 'react';
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import LoginButton from '@components/button/log-in';
import SimpleMenu from "../buttonMenu/index";
import ListIcon from '@mui/icons-material/List';
import { theme } from "src/core/theme";
import { itemsMenu } from '../itensMenu';

export default function Index (){

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return(
    <>
      <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ ml: 'auto' }}
      onClick={handleClick}>
        <ListIcon />
    </IconButton>

    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
      'aria-labelledby': 'basic-button',
      }}
  >
    {itemsMenu.map((item, index) => (
      <SimpleMenu key={index} element={item} />
    ))}
    </Menu>
    </>
  )
}