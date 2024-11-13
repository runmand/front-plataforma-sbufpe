import Base from '@components/base-layout/index';

import React from 'react';
import NewMenu from '@components/newMenu/index'
import FooterMain from '@components/footer/main/index';
import BiComponent from "@components/bi/index"

export default function Index() {
  return (
    <Base
      appBarChild={<NewMenu/>}
      mainContainerChild= {<BiComponent form='aps' type='closed'/>}
      footerChild={<FooterMain />}
			/>	
  );
}

