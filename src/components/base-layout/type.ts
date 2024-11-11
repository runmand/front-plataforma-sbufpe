import { SxProps } from '@mui/material';
import { ReactElement } from 'react';

export type TPROPS = {
	appBarChild: ReactElement;
	mainContainerChild?: ReactElement;
	footerChild?: ReactElement;
	style?: SxProps
};
