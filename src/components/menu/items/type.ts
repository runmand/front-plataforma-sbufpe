import { ID } from 'src/core/types';

export type TProps = { parentId?: ID; item: TMenuItem; incrementalLeftChildMargin: number };

export type TMenuItem = {
	id: ID;
	title: string;
	url: string;
	menuItemChildren?: TMenuItem[];
};
