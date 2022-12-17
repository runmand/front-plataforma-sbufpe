export type ID = string | number;

export type RESPONSE = {
	status: number;
	data: null | object;
	msg: null | string;
	errors: string[];
};
