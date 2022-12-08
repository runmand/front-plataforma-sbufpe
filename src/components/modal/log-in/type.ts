export type IProps = {
	isOpen: boolean;
	canSkip?: boolean;
	onClose: () => void;
};

export type THandleLogin = {
	login: string;
	pwd: string;
};
