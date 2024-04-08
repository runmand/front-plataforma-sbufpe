import { InputBaseComponentProps, TextField } from '@mui/material';
import { iconButtonStyle, textField, wrapperStyle } from './style';
import { TPROPS } from './type';
import IconButton from '@mui/material/IconButton';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import React from 'react';
import MaskUtils from 'src/utils/maskUtils';
import { loginTypeEnum } from 'src/core/enums';
import { config } from 'src/core/config';

export default function Index(props: TPROPS) {
	const maskUtils = new MaskUtils();
	const textType = 'text';
	const pwdType = 'password';
	const [value, setValue] = React.useState<string>('');
	const [oldValue, setOldValue] = React.useState<string>('');
	const [isShowPwd, setIsShowPwd] = React.useState<boolean>(false);
	const [inputProps, setInputProps] = React.useState<InputBaseComponentProps>();

	/** Observador que define o comportamento do campo baseado no tipo de mascara definida, se houver uma... */
	const maskObserver: { [key: string]: (v: string) => string } = {
		[loginTypeEnum.CPF]: (v: string): string => {
			setInputProps({ ...inputProps, maxLength: config.cpfMaskedMaxLength });
			return maskUtils.apply(v, oldValue, config.cpfMask);
		},
		[loginTypeEnum.DDI_DDD_CELLPHONE]: (v: string): string => {
			setInputProps({ ...inputProps, maxLength: config.cellphoneMaskedMaxLength });
			return maskUtils.apply(v, oldValue, config.cellphoneMask);
		},
		default: (v: string): string => {
			setInputProps({ ...inputProps, maxLength: Infinity });
			return v;
		},
	};

	/** Função responsavel por formatar os dados caso exista uma mascara definida para este campo. */
	const onInputCapture = (e: React.FormEvent<HTMLDivElement>) => {
		const target = e.target as HTMLInputElement;
		const maskType = maskObserver.hasOwnProperty(props.maskType) ? props.maskType : 'default';
		const maskedValue = maskObserver[maskType](target.value);
		setOldValue(maskedValue);
		setValue(maskedValue);

		/** Atualiza o valor do campo. Pois o autopreenchimento não ativa o onBlur. */
		props.onBlur(target.value);
	};

	/** Caso exista um callback para que outro componente possa limpar este campo, é aqui onda o clear é feito. */
	if (props.onClear) props.onClear(() => setValue(''));

	return (
		<div style={wrapperStyle}>
			<TextField
				variant='outlined'
				label={props.title}
				style={textField}
				onBlur={e => props.onBlur(e.target.value)}
				type={props.textType ? (props.textType === pwdType ? (isShowPwd ? textType : props.textType) : props.textType) : textType}
				value={value}
				onInputCapture={e => onInputCapture(e)}
				inputProps={inputProps}
			/>

			{props.textType === pwdType && (
				<IconButton style={iconButtonStyle} onClick={() => setIsShowPwd(!isShowPwd)}>
					{isShowPwd ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
				</IconButton>
			)}
		</div>
	);
}
