import { http } from 'src/core/axios';
import { RESPONSE } from 'src/core/types';
import { USER_TYPE } from './type';

/**
 * `/user-types` é rota pública no backend (também usada no cadastro, fora de login) —
 * não precisa de token. Serve pra resolver o `typeId` guardado no localStorage numa
 * DESCRIÇÃO (ex.: "Desenvolvedor"), já que o id numérico do tipo Desenvolvedor não é
 * garantido ser o mesmo em todo ambiente (não está fixado em nenhuma migration).
 */
export default class UserTypeService {
	index = async (): Promise<RESPONSE<USER_TYPE[]>> => {
		return http.get('/user-types');
	};
}
