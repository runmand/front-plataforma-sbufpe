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

export type GET_USER_TYPES_RES = {
	id: ID;
	createdAt: Date;
	deletedAt: Date | null;
	description: string;
};

export type USER_TYPE = {
	id: ID;
	label: string;
};
