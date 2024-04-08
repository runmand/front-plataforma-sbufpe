export default class MaskUtils {
	apply(value: string, oldValue: string, mask: string) {
		/** Caso o usuário tenha apagado um caracter, não cria mascara. */
		if (oldValue.length >= value.length) return value;

		const valueCharList = value.replace(/[\D]/g, '').split('');

		valueCharList.forEach(char => (mask = mask.replace('#', char)));

		const index = mask.indexOf('#');
		return index < 0 ? mask : mask.slice(0, index);
	}
}
