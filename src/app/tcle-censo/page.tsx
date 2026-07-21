'use client';

import { useEffect } from 'react';
import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index';
import TcleCenso from '@components/container/tcle-censo';
import FooterMain from '@components/footer/main/index';

export default function Page() {
    useEffect(() => {
        document.title = 'TCLE do Censo | GestBucal';
    }, []);

    return (
        <Base appBarChild={<NewMenu />} mainContainerChild={<TcleCenso />} footerChild={<FooterMain />} />
    );
}
