import { http } from 'src/core/axios';
import { RESPONSE, ID } from 'src/core/types';
import { REQUIREMENTS_RES } from './type';

export default class TermRequirementService {
	private path = '/term-requirements';

	/** O que `TcleModal` chama pra saber quais termos o formulário exige do usuário atual. */
	getForForm = async (formId: ID): Promise<RESPONSE<REQUIREMENTS_RES>> => {
		return http.get(`${this.path}/${formId}`, { silent: true });
	};
}
