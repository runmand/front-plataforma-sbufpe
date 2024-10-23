import { IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { atualPageAreaStyle, atualPageTitleStyle, toolbarStyle } from "./style";
import DrawerMenu from "@components/menu/drawer/index";
import React, { useEffect, useState } from "react";
import { MENU_ITEM } from "@components/menu/items/type";
import { localStorageKeyEnum, routerEnum } from "src/core/enums";
import { useRouter } from "next/router";
import { http } from "src/core/axios";

export default function Index() {
  const router = useRouter();
  const [menu, setMenu] = useState([
    { id: 0, title: "Questionário Inicial", url: routerEnum.QUESTION },
    { id: 1, title: "Questionários", url: routerEnum.FORM },
    { id: 3, title: "Planeja SD - Teórico", url: routerEnum.PLANEJA },
    { id: 4, title: "Planeja SD - Pratico", url: routerEnum.PLANEJA_PRATICO,},    
    { id: 5, title: "Nossos dados: APS", url: routerEnum.DATAAPS},
    { id: 6, title: "Nossos dados: CEO", url: routerEnum.DATACEO}
  ]);
  const [isDrawerMenuOpen, setIsDrawerMenuOpen] =
    React.useState<boolean>(false);

  //TODO: Remover o hardcode e buscar os menus verdadeiros
  // const menu: MENU_ITEM[] = [
  //   { id: 0, title: "Questionário Inicial", url: routerEnum.QUESTION },
  //   { id: 1, title: "Questionários", url: routerEnum.FORM },
  //   { id: 3, title: "Planeja SD", url: routerEnum.PLANEJA },
  // ];

  useEffect(() => {
    const id = Number(localStorage.getItem("typeId"));
    if (id <= 2) {
      // Atualiza o estado do menu usando setMenu
      setMenu(prevMenu => [
        ...prevMenu,
        { id: 7, title: "Exportar Dados", url: routerEnum.DATA }
      ]);
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem(localStorageKeyEnum.TOKEN);
    localStorage.removeItem(localStorageKeyEnum.TYPE_ID);
    router.push(routerEnum.INITIAL);
  };

  return (
    <Toolbar style={toolbarStyle}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={() => setIsDrawerMenuOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      <div style={atualPageAreaStyle}>
        <Typography style={atualPageTitleStyle}>SD - UFPE</Typography>
      </div>

      <IconButton
        size="medium"
        aria-label="display more actions"
        edge="start"
        color="inherit"
        onClick={() => handleLogout()}
      >
        <LogoutIcon /> Sair
      </IconButton>
      <DrawerMenu
        isOpen={isDrawerMenuOpen}
        menuItems={menu}
        onClose={() => setIsDrawerMenuOpen(false)}
      />
    </Toolbar>
  );
}
