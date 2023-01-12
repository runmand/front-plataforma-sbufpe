import { ID } from 'src/core/types';

export type TPROPS = {
	parentId?: ID;
	item: MENU_ITEM;
	incrementalLeftChildMargin: number;
};

export type MENU_ITEM = {
	id?: ID;
	title: string;
	url?: string;
	menuItemChildren?: MENU_ITEM[];
	onClick?: () => void;
};
