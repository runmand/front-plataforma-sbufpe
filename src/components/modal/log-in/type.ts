import { loginTypeEnum } from 'src/core/enums';

export type TPROPS = {
	isOpen: boolean;
	canSkip?: boolean;
	onClose: () => void;
};

export type HANDLE_LOGIN = {
	login: string;
	pwd: string;
	loginType: loginTypeEnum;
};

export type HANDLE_LOGIN_RES = {
	token: string;
};
