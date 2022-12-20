export type TPROPS = {
	isOpen: boolean;
	isLoading: boolean;
	canSkip?: boolean;
	onClose: () => void;
	onConfirm: () => void;
};
