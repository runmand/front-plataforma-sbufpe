import { loginTypeEnum } from 'src/core/enums';

export default class LoginUtils {
	loginTypeList = [
		{
			title: 'CPF',
			key: loginTypeEnum.CPF,
		},
		{
			title: 'Celular',
			key: loginTypeEnum.DDI_DDD_CELLPHONE,
		},
		{
			title: 'E-mail',
			key: loginTypeEnum.EMAIL,
		},
		{
			title: 'Username',
			key: loginTypeEnum.USERNAME,
		},
	];
}
