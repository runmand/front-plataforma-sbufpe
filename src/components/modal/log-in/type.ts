export type TPROPS = {
	isOpen: boolean;
	canSkip?: boolean;
	onClose: () => void;
};

export type HANDLE_LOGIN = {
	login: string;
	pwd: string;
};
