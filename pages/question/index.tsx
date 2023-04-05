import Base from '@components/base-layout/index'
import Appbar from '@components/app-bar/index';
import HomeToolbar from '@components/toolbar/home'

export default function Index(){
  return(

    <Base
      appBarChild={
        <Appbar
          toolbarChild={
            <HomeToolbar/>
          }
            />
          }
      mainContainerChild={
        <>
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSefdMYNtKCdNfa6GDvzOUl9IOpRe682asL_3dDVwaRBJ0z5pA/viewform?embedded=true" width="100%" height='595' >Carregando…</iframe>
      </>

    }
    
    />
  );
}