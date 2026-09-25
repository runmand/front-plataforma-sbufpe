import { ID } from 'src/core/types';

export type ADMIN_USER = {
	id: ID;
	cpf?: string | null;
	cellphone?: string | null;
	email?: string | null;
	username?: string | null;
	isTest: boolean;
	createdAt: string;
	typeId: { id: ID; description: string } | ID;
};

export type INDEX_QUERY = {
	search?: string;
	typeId?: ID;
	isTest?: boolean;
};

export type CREATE_BODY = {
	login: string;
	email: string;
	pwd: string;
	typeId: ID;
	isTest: boolean;
};

export type USER_TYPE = {
	id: ID;
	description: string;
};
