'use client';

import { useEffect } from 'react';
import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index';
import FooterMain from '@components/footer/main/index';
import VigiaDashboard from '@components/dashboard/vigia/index';

export default function Page() {
    useEffect(() => {
        document.title = 'Dashboard Vigia SD | GestBucal';
    }, []);

    return (
        <Base
            appBarChild={<NewMenu />}
            mainContainerChild={<VigiaDashboard />}
            footerChild={<FooterMain />}
        />
    );
}
