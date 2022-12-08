import { HTMLInputTypeAttribute } from 'react';

export type TProps = {
	title: string;
	type?: HTMLInputTypeAttribute;
	onBlur: (value: string) => void;
};
