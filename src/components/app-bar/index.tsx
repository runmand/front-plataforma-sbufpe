import * as React from 'react';
import { TPROPS } from './type';

export default function Index(props: TPROPS) {
	return (
		<header style={{
			position: 'fixed',
			top: 0, left: 0, right: 0,
			zIndex: 100,
			backgroundColor: '#6D141A',
			height: '68px',
			display: 'flex',
			alignItems: 'center',
			boxShadow: '0 2px 12px rgba(109,20,26,0.18)',
		}}>
			{props.toolbarChild}
		</header>
	);
}
