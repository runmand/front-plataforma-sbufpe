export type TERM_VARIANT = 'TCLE' | 'TCLE2' | 'TCLEPROF' | 'TCLEUSAB' | 'TALE18' | 'TALEU13';

export type REQUIREMENT_GROUP = {
	pathKey: string;
	variants: TERM_VARIANT[];
};

export type REQUIREMENTS_RES = {
	exempt: boolean;
	groups: REQUIREMENT_GROUP[];
};
