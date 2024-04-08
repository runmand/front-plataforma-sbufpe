import { MENU_ITEM } from '@components/menu/items/type';

export type TProps = {
	onClickInitialButton: () => void;
	openLoginModal: () => void;
	openSignupModal: () => void;
	menuList: {
		title: string;
		onClick?: () => void;
		menuItems?: MENU_ITEM[];
	}[];
};
