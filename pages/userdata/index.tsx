import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index'
import UserData from '@components/container/user-data';
import FooterMain from '@components/footer/main/index';

export default function Index() {
	return (
		<Base
			appBarChild={<NewMenu/>}
			mainContainerChild={<UserData/>}
			footerChild={<FooterMain />}
		/>
	);
}
