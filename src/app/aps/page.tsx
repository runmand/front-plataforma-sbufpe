'use client';

import { useEffect } from 'react';
import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index';
import FooterMain from '@components/footer/main/index';
import BiComponent from '@components/bi/index';

export default function Page() {
    useEffect(() => {
        document.title = 'APS | GestBucal';
    }, []);

    return (
        <Base
            appBarChild={<NewMenu />}
            mainContainerChild={<BiComponent form='aps' type='closed' />}
            footerChild={<FooterMain />}
        />
    );
}
