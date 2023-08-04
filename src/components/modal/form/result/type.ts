import { GET_USER_RESULT_FROM_FORM_RES } from 'src/pages/form-answer/type';

export type TPROPS = {
	isOpen: boolean;
	canSkip?: boolean;
	onClose: () => void;
	formResult: GET_USER_RESULT_FROM_FORM_RES;
};
