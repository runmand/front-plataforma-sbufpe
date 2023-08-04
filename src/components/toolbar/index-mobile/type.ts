import { MENU_ITEM } from '@components/menu/items/type';

export type TPROPS= {
  onClickInitialButton: () => void;
  onClick?: () => void;
  openLoginModal: () => void;
  menuList: {
		title: string;
		onClick?: () => void;
		menuItems?: MENU_ITEM[];
	}[];
}