import { CSSProperties } from 'react';
import { theme } from 'src/core/theme';

export const carouselStyle: CSSProperties = {
	display: 'flex',
	justifyContent:'center',
	flexWrap:'wrap',
	backgroundColor: theme.greyLight,
	height:'60vh',
	padding:'5vh'
	
};
export const carouselStyleItens:CSSProperties = {
	display:'flex',
	width:'80%',
	gap:'15%'
};
export const carouselStyleLogo:CSSProperties = {
	width:'40%',
	display:'flex',
	justifyContent:'center',
	padding:'5% 0 5% 0'
};

export const carouselStyleItem: CSSProperties ={
	display:'flex',
	flexDirection:'column',
	justifyContent:'center',
	alignItems:'flex-start',
	flexWrap:'wrap',
	margin:'2%',
	width:'100%'
};

export const carouselStyleTitle: CSSProperties ={
	color:theme.primaryColor,
	textAlign:'justify',
	alignContent:'center',
	height:'20%',
	fontSize:'2.5rem'
	

};

export const carouselStyleSubTitle: CSSProperties ={
	textAlign:'justify',
	alignContent:'center',
	height:'20%'

};
export const carouselStyleDescription: CSSProperties ={
	color:theme.secundaryColor,
	textAlign:'justify',
	alignContent:'center',
	height:'30%'

};
export const carouselStyleButton: CSSProperties ={
	...theme.button,
	marginTop: '1rem',
	borderRadius: '16px',
	backgroundColor: theme.white,
	borderColor: theme.secundaryColor,
	color: theme.secundaryColor,
	
};

export const infoStyle: CSSProperties = { 
	display: 'flex',
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
	margin: '0.25rem 0rem 0rem 0rem' 
};
