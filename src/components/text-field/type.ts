import { HTMLInputTypeAttribute } from 'react';

export type TPROPS = {
	title: string;
	type?: HTMLInputTypeAttribute;
	onBlur: (value: string) => void;
};
