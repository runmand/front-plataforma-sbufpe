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
    { id: 3, title: "Planeja SD", url: routerEnum.PLANEJA },
  ]);
  const [isDrawerMenuOpen, setIsDrawerMenuOpen] =
    React.useState<boolean>(false);

  //TODO: Remover o hardcode e buscar os menus verdadeiros
  // const menu: MENU_ITEM[] = [
  //   { id: 0, title: "Questionário Inicial", url: routerEnum.QUESTION },
  //   { id: 1, title: "Questionários", url: routerEnum.FORM },
  //   { id: 3, title: "Planeja SD", url: routerEnum.PLANEJA },
  // ];

  async function checkUserPlanejaForm() {
    try {
      const { data } = await http.get(
        `plan-question-answer/user/${Number(
          localStorage.getItem(localStorageKeyEnum.USER_ID)
        )}`
      );

      if (data.length > 0) {
        setMenu((prevState) => {
          return [
            ...prevState,
            {
              id: 3,
              title: "Prático SD",
              url: routerEnum.PLANEJA_PRATICO,
            },
          ];
        });
      }

      return data;
    } catch (err) {
      console.error(err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem(localStorageKeyEnum.TOKEN);
    localStorage.removeItem(localStorageKeyEnum.TYPE_ID);
    router.push(routerEnum.INITIAL);
  };

  useEffect(() => {
    checkUserPlanejaForm();
  }, []);

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
