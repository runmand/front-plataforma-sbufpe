import { ID } from "../../core/types";
import { Question } from "../Question";

export type FormState = {
	id: ID;
	title: string;
	completionMessage: string;
	questions: Question[];
};