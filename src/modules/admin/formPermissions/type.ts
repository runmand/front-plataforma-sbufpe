import { ID } from 'src/core/types';

export type MATRIX_ROW = {
	typeId: ID;
	typeDescription: string;
	canView: boolean;
	canAnswer: boolean;
};

export type UPSERT_BODY = {
	formId: ID;
	typeId: ID;
	canView: boolean;
	canAnswer: boolean;
};
