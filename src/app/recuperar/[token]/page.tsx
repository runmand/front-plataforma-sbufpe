'use client';

import { useEffect } from 'react';
import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index';
import ResetPWD from '@components/resetByLink';
import FooterMain from '@components/footer/main/index';

export default function Page() {
    useEffect(() => {
        document.title = 'Redefinir Senha | GestBucal';
    }, []);

    return (
        <Base appBarChild={<NewMenu />} mainContainerChild={<ResetPWD />} footerChild={<FooterMain />} />
    );
}
