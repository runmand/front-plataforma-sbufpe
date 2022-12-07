import { CSSProperties } from 'react';
import { theme } from 'src/core/theme';

export const buttonStyle: CSSProperties = {
	minWidth: theme.button.minWidth,
	minHeight: theme.button.minHeight,
	borderRadius: theme.borderRadiusSmooth,
	borderStyle: theme.button.border.style,
	borderColor: theme.button.border.color,
	borderWidth: theme.button.border.width,
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
