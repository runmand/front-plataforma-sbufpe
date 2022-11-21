export type IProps = {
	isOpen: boolean;
	isLoading: boolean;
	canSkip?: boolean;
	onClose: () => void;
	onConfirm: () => void;
};
