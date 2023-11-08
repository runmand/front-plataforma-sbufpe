import { MENU_ITEM } from '../items/type';

export type TPROPS = {
  isOpen: boolean;
  menuItems: MENU_ITEM[];
  onClose: () => void;
};
