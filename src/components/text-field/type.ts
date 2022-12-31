import { HTMLInputTypeAttribute } from 'react';
import { loginTypeEnum } from 'src/core/enums';

export type TPROPS = {
	title: string;
	textType?: HTMLInputTypeAttribute;
	maskType?: loginTypeEnum /** Aqui deveria aceitar mais tipos de mascaras além das mascaras do login. Sempre que necessario, colocar um <OR> para novos <enums> */;
	onBlur: (value: string) => void;
	onClear?: (callback: () => void) => void;
};
