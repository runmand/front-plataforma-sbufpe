import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index'
import CeoData from '@components/container/ceo-data';
import FooterMain from '@components/footer/main/index';

export default function Index() {
	return (
		<Base
			appBarChild={<NewMenu/>}
			mainContainerChild={<CeoData/>}
			footerChild={<FooterMain />}
		/>
	);
}
