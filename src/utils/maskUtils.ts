import { config } from 'src/core/config';

export default class MaskUtils {
	cpf(value: string, oldValue: string) {
		/** Caso o usuário tenha apagado um caracter, não cria mascara. */
		if (oldValue.length >= value.length) return value;

		let mask = config.cpfMask;
		const valueCharList = value.replace(/[\D]/g, '').split('');

		valueCharList.forEach(char => (mask = mask.replace('#', char)));

		const index = mask.indexOf('#');
		return index < 0 ? mask : mask.slice(0, index);
	}

	cellphone(value: string, oldValue: string) {
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
