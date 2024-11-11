import Base from '@components/base-layout/index';
import NewMeni from '@components/newMenu/index'
import AboutUsContainer from '@components/container/about-us';
import FooterMain from '@components/footer/main/index';

export default function Index() {
	return (
		<Base
			appBarChild={<NewMeni/>}
			mainContainerChild={<AboutUsContainer/>}
			footerChild={<FooterMain />}
		/>
	);
}
