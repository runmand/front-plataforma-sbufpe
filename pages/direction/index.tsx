import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index'
import DirectionComponent from '@components/container/direction'
import FooterMain from '@components/footer/main/index';

export default function Index() {
	return (
		<Base
			appBarChild={<NewMenu/>}
			mainContainerChild={<DirectionComponent/>}
			footerChild={<FooterMain />}
		/>
	);
}
