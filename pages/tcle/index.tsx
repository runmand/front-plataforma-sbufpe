import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index'
import Tcle from '@components/container/tcle';
import FooterMain from '@components/footer/main/index';

export default function Index() {
	return (
		<Base
			appBarChild={<NewMenu/>}
			mainContainerChild={<Tcle/>}
			footerChild={<FooterMain />}

		/>
	);
}
