import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index'
import ContactUsContainer from '@components/container/contact-us';

export default function Index() {
	return (
		<Base
			appBarChild={<NewMenu/>}
			mainContainerChild={<ContactUsContainer/>}
		/>
	);
}
