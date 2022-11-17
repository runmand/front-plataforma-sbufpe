import { ChangeEvent } from 'react';
import { ID } from '../../core/types';
import { Question } from '../questions/contract';

export type IProps = {
	choices: Choice[];
	onChange: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
};

export type Choice = {
	formsQuestionFormsQuestionChoicesId: ID;
	title: string;
	score: number;
};
