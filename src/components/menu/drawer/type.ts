import { MENU_ITEM } from "../items/type";

export type TPROPS = {
    showPDF?: boolean;
    showExit?: boolean;
    exitFunction?: () => void;
    isOpen: boolean;
    menuItems: MENU_ITEM[];
    onClose: () => void;
};
