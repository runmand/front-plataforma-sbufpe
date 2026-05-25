'use client';

import { useEffect } from 'react';
import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index';
import ContactUsContainer from '@components/container/contact-us';

export default function Page() {
    useEffect(() => {
        document.title = 'Contato | GestBucal';
    }, []);

    return (
        <Base
            appBarChild={<NewMenu />}
            mainContainerChild={<ContactUsContainer />}
        />
    );
}
