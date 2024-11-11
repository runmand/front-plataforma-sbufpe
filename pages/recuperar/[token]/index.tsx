import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index'
import ResetPWD from '@components/resetByLink'
import FooterMain from '@components/footer/main/index';

export default function Index() {
	return (
		<Base
			appBarChild={<NewMenu/>}
			mainContainerChild={<ResetPWD/>}
			footerChild={<FooterMain />}
		/>
	);
}
