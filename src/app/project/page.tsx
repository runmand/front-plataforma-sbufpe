'use client';

import { useEffect } from 'react';
import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index';
import WhatIs from '@components/container/what-is';
import FooterMain from '@components/footer/main/index';

export default function Page() {
    useEffect(() => {
        document.title = 'O Projeto | GestBucal';
    }, []);

    return (
        <Base appBarChild={<NewMenu />} mainContainerChild={<WhatIs />} footerChild={<FooterMain />} />
    );
}
