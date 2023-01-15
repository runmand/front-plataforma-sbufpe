import { Drawer } from '@mui/material';
import React from 'react';
import { TPROPS } from './type';
import ListMenu from '@components/menu/list/index';
import { modalStyle } from './style';

//TODO: Permitir configuração da posição do drawer menu
export default function Index(props: TPROPS) {
	return (
		<Drawer
			anchor={'left'}
			open={props.isOpen}
			onClose={() => props.onClose()}
			style={modalStyle}
		>
			<ListMenu items={props.menuItems} />
		</Drawer>
	);
}
