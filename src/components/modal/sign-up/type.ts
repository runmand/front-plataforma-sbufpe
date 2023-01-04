import { ID } from 'src/core/types';

export type TPROPS = {
	isOpen: boolean;
	canSkip?: boolean;
	onClose: () => void;
};

export type HANDLE_SIGNUP = {
	login: string;
	pwd: string;
	typeId: ID;
};

export type HANDLE_SIGNUP_RES = {
	token: string;
};
