import { ID } from 'src/core/types';

export type TERM_VARIANT = 'TCLE' | 'TCLE2' | 'TCLEPROF' | 'TCLEUSAB' | 'TALE18' | 'TALEU13';

export type ADMIN_ROW = {
	id: ID;
	pathKey: string;
	variant: TERM_VARIANT | null;
	typeId: { id: ID; description: string } | ID | null;
};

export type CREATE_BODY = {
	formId: ID;
	typeId?: ID | null;
	pathKey: string;
	variant?: TERM_VARIANT | null;
};
