import Head from 'next/head';
import Base from '@components/base-layout/index';

import React from 'react';
import NewMenu from '@components/newMenu/index'
import FooterMain from '@components/footer/main/index';
import BiComponent from "@components/bi/index"

export default function Index() {
  return (
    <>
      <Head>
        <title>APS | GestBucal</title>
      </Head>
      <Base
        appBarChild={<NewMenu/>}
        mainContainerChild= {<BiComponent form='aps' type='closed'/>}
        footerChild={<FooterMain />}
      />
    </>
  );
}

