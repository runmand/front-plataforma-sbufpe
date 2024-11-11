import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index'
import ApsData from '@components/container/aps-data';
import FooterMain from '@components/footer/main/index';

export default function Index() {
	return (
		<Base
			appBarChild={<NewMenu/>}
			mainContainerChild={<ApsData/>}
			footerChild={<FooterMain />}
		/>
	);
}
