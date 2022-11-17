import { ChangeEvent } from 'react';

export type IProps = {
	onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: string) => void;
};
