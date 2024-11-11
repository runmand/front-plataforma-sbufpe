import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index'
import WhatIs from '@components/container/what-is';
import FooterMain from '@components/footer/main/index';

export default function Index() {
	return (
		<Base
			appBarChild={<NewMenu/>}
			mainContainerChild={<WhatIs/>}
			footerChild={<FooterMain />}

		/>
	);
}
