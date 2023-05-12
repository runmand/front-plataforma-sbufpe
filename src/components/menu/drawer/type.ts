import { MENU_ITEM } from '../items/type';

export type TPROPS = {
	position: string;
	isOpen: boolean;
	menuItems: MENU_ITEM[];
	onClose: () => void;
};
