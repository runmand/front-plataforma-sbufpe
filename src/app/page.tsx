'use client';

import { useEffect } from 'react';
import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index';
import HomeComponent from '@components/container/home';
import FooterMain from '@components/footer/main/index';

export default function Page() {
    useEffect(() => {
        document.title = 'Início | GestBucal';
    }, []);

    return (
        <Base
            style={{
                minHeight: '100dvh',
                display: 'flex',
                flexDirection: 'column',
                '& > footer': { position: 'static', flexShrink: 0, flexWrap: 'wrap' },
            }}
            appBarChild={<NewMenu />}
            mainContainerChild={<HomeComponent />}
            footerChild={<FooterMain />}
        />
    );
}
