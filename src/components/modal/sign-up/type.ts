import { ID } from 'src/core/types';
import { USER_TYPE_RESPONSE } from '../log-in/type';

export type TPROPS = {
	isOpen: boolean;
	canSkip?: boolean;
	onClose: () => void;
	openTclePage: () => void;
};

export type HANDLE_SIGNUP = {
	login: string;
	pwd: string;
	typeId: ID;
};

export type HANDLE_SIGNUP_RES = {
	token: string;
	user_type:USER_TYPE_RESPONSE
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
