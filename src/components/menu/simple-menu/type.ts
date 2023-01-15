import { MENU_ITEM } from '../items/type';

export type TProps = {
	title: string;
	menuItems: MENU_ITEM[];
	onClick: () => void;
};
