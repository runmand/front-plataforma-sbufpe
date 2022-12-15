import { TMenuItem } from '../items/type';

export type TProps = {
	isOpen: boolean;
	menuItems: TMenuItem[];
	onClose: () => void;
};
