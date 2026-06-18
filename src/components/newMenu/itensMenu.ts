import { routerEnum } from "src/core/enums";
import { itemsListType } from "./type";
import { MENU_ITEM } from "@components/menu/items/type";

export const itemsMenu: itemsListType[] = [
    { position: 1, title: "Início", route: routerEnum.HOME },
    { position: 2, title: "Artigos", route: routerEnum.ARTICLES },
    {
        position: 3,
        title: "Quem Somos",
        route: routerEnum.TEAM,
    },
    { position: 4, title: "O que é GESTBUCAL SD?", route: routerEnum.PROJECT },
    { position: 5, title: "Contato", route: routerEnum.CONTACTUS },
    { position: 6, title: "F.A.Q", route: routerEnum.FAQ },
    { position: 7, title: "Nossos dados - Usuários", route: routerEnum.USER },
    { position: 8, title: "Nossos dados -CEO", route: routerEnum.CEO },
    { position: 9, title: "Nossos dados -APS", route: routerEnum.APS },
];

export const itemsDrawer: MENU_ITEM[] = [
    { id: 1, title: "Questionários", url: routerEnum.FORM },
    { id: 3, title: "Planeja SD - Teórico", url: routerEnum.PLANEJA },
    { id: 4, title: "Planeja SD - Pratico", url: routerEnum.PLANEJA_PRATICO },
    { id: 5, title: "Nossos dados: APS", url: routerEnum.DATAAPS },
    { id: 6, title: "Nossos dados: CEO", url: routerEnum.DATACEO },
];
