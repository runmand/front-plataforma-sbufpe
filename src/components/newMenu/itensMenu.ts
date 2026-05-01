import { routerEnum } from 'src/core/enums';
import { itemsListType } from './type';
import { MENU_ITEM } from '@components/menu/items/type';

export const itemsMenu: itemsListType[] = [
  {position: 1, title: "Início", route: routerEnum.HOME},
  {position: 2, title: "Acervo", subList: [{position: 1, title: 'Artigos', route: routerEnum.ARTICLES}]},
  {position: 3, title: "Quem Somos", subList: [{position: 1, title: 'Quem Somos?', route: routerEnum.TEAM}, {position: 2, title: 'O que é GESTBUCAL SD?', route: routerEnum.PROJECT}]},
  {position: 4, title: "Contato", route: routerEnum.CONTACTUS},
  {position: 5, title: "F.A.Q", route: routerEnum.FAQ},
  {position: 6, title: "Nossos dados", subList: [{position: 1, title: 'Usuários', route: routerEnum.USER}, {position: 1, title: 'CEO', route: routerEnum.CEO}, {position: 1, title: 'APS', route: routerEnum.APS}]},
]

export const itemsDrawer: MENU_ITEM[] = [
  { id: 1, title: "Questionários", url: routerEnum.FORM },
  { id: 3, title: "Planeja SD - Teórico", url: routerEnum.PLANEJA },
  { id: 4, title: "Planeja SD - Pratico", url: routerEnum.PLANEJA_PRATICO,},    
  { id: 5, title: "Nossos dados: APS", url: routerEnum.DATAAPS},
  { id: 6, title: "Nossos dados: CEO", url: routerEnum.DATACEO}
]