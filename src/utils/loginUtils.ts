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
			title: 'Username',
			key: loginTypeEnum.USERNAME,
		},
	];
}

export class LoginUtilsEmail {
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
			title: 'Username',
			key: loginTypeEnum.USERNAME,
		},
		{
			title: 'Email',
			key: loginTypeEnum.EMAIL
		}
	];
}

