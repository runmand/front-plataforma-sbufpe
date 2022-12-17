export type ID = string | number;

export type RESPONSE<D> = {
	status: number;
	data?: null | D;
	msg?: null | string[];
	errors?: string[];
};
