export type TPROPS = {
	title: string;
	msg?: string;
	isOpen: boolean;
	isLoading: boolean;
	canSkip?: boolean;
	onClose: () => void;
	onCancel?: () => void;
	onConfirm?: () => void;
};
