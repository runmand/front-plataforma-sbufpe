import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index'
import Faq from '@components/container/faq';
import FooterMain from '@components/footer/main/index';

export default function Index() {
	return (
		<Base
			appBarChild={<NewMenu/>}
			mainContainerChild={<Faq/>}
			footerChild={<FooterMain />}
		/>
	);
}
