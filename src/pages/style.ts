import { CSSProperties } from 'react';
import { theme } from 'src/core/theme';

export const infoStyle: CSSProperties = { 
	display: 'flex',
	flexWrap:'wrap',
	justifyContent: 'center',
	backgroundColor: theme.primaryColor 
};
export const listTitleStyle: CSSProperties = { 
	fontWeight: 'bold',
	margin: '1rem 2rem 1rem 2rem' 
};
export const listStyle: CSSProperties = { 
	margin: '1rem 0rem 0rem 0rem' 
};
export const listItemStyle: CSSProperties = { 
	margin: '0.25rem 0rem 0rem 0rem' ,
	
};
