'use client';

import { useEffect } from 'react';
import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index';
import FooterMain from '@components/footer/main/index';
import CeoDashboard from '@components/dashboard/ceo/index';

export default function Page() {
    useEffect(() => {
        document.title = 'Dashboard CEO | GestBucal';
    }, []);

    return (
        <Base
            appBarChild={<NewMenu />}
            mainContainerChild={<CeoDashboard />}
            footerChild={<FooterMain />}
        />
    );
}
