import { config } from 'src/core/config';

export default class MaskUtils {
	cpf(value: string) {
		const rawValue = value.replace(/[\D]/g, '');
		const charList = rawValue.split('');

		config.cpfMask.split('').forEach((maskChar, index) => {
			if (maskChar !== '#' && charList[index - 1] && maskChar !== charList[index]) charList.splice(index, 0, maskChar);
		});

		return charList.join('');
	}

	cellphone(value: string) {
		const rawValue = value.replace(/[^a-zA-Z0-9\+]|^0/g, '');
		const charList = rawValue.split('');
		let result = '';

		config.cellphoneMask.split('').forEach((maskChar, index) => {
			if (index === 0 || (maskChar !== '#' && charList[index - 1] && maskChar !== charList[index])) charList.splice(index, 0, maskChar);
		});

		result = charList.join('');

		return result;
	}
}
