import Base from '@components/base-layout/index'
import Appbar from '@components/app-bar/index';
import HomeToolbar from '@components/toolbar/home'
import NewMenu from '@components/newMenu/index'
import FooterMain from '@components/footer/main/index';
import { Box, useMediaQuery } from '@mui/material';
import { theme } from 'src/core/theme';

export default function Index(){
  const largeQuery = useMediaQuery('(min-width:720px)')


  return(

    <Base
      appBarChild={<NewMenu/>}
      mainContainerChild={<Box sx={{      
        background: theme.greyLight,
        marginTop:'5.5rem',
        paddingTop:!largeQuery? '2rem' : '1rem',
        minHeight:'100vh',
        display:'flex',
        justifyContent:'center'}}><iframe src="https://docs.google.com/forms/d/e/1FAIpQLSefdMYNtKCdNfa6GDvzOUl9IOpRe682asL_3dDVwaRBJ0z5pA/viewform?embedded=true" width="100%">Carregando…</iframe></Box>}
      footerChild={<FooterMain />}
    />
  );
}