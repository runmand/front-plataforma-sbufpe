'use client';

import { useEffect } from 'react';
import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index';
import Tcle from '@components/container/tcle';
import FooterMain from '@components/footer/main/index';

export default function Page() {
    useEffect(() => {
        document.title = 'TCLE | GestBucal';
    }, []);

    return (
        <Base appBarChild={<NewMenu />} mainContainerChild={<Tcle />} footerChild={<FooterMain />} />
    );
}
