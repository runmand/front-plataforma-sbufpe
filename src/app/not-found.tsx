'use client';

import { useEffect } from 'react';
import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index';
import NotFoundComponent from '@components/not-found';
import FooterMain from '@components/footer/main/index';

export default function NotFound() {
    useEffect(() => {
        document.title = 'Página não encontrada | GestBucal';
    }, []);

    return (
        <Base appBarChild={<NewMenu />} mainContainerChild={<NotFoundComponent />} footerChild={<FooterMain />} />
    );
}
