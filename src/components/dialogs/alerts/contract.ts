export type IProps = {
	title: string;
	msg?: string;
	isOpen: boolean;
	isLoading: boolean;
	canSkip?: boolean;
	onClose: () => void;
	onConfirm: () => void;
};
