'use client';

import { useEffect } from 'react';
import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index';
import Informes from '@components/container/informes';
import FooterMain from '@components/footer/main/index';

export default function Page() {
    useEffect(() => {
        document.title = 'Informes | GestBucal';
    }, []);

    return (
        <Base appBarChild={<NewMenu />} mainContainerChild={<Informes />} footerChild={<FooterMain />} />
    );
}
