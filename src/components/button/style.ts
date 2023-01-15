import { CSSProperties } from 'react';
import { theme } from 'src/core/theme';

export const buttonStyle: CSSProperties = {
	...theme.button,
	minWidth: theme.button.minWidth,
	minHeight: theme.button.minHeight,
	borderRadius: theme.borderRadiusSmooth,
	fontSize: theme.button.fontSize,
	fontWeight: theme.button.fontWeight,
	backgroundColor: theme.button.backgroundColor,
	color: theme.button.color,
};

export const disabledButtonStyle = (style: CSSProperties): CSSProperties => ({
	...style,
	color: theme.button.disabled.color,
	backgroundColor: theme.button.disabled.backgroundColor,
	borderColor: theme.button.disabled.border.color,
});
