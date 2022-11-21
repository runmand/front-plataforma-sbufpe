export type IProps = {
	isOpen: boolean;
	isLoading: boolean;
	canSkip?: boolean;
	onClose: () => void;
	onConfirm: (login: string, pwd: string) => void;
};
