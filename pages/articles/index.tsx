import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index'
import CollectionContainer from '@components/container/collection';
import FooterMain from '@components/footer/main/index';

export default function Index() {
	return (
		<Base
			appBarChild={<NewMenu/>}
			mainContainerChild={<CollectionContainer/>}
			footerChild={<FooterMain />}

		/>
	);
}
