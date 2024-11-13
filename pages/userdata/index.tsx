import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index'
import UserData from '@components/container/user-data';
import FooterMain from '@components/footer/main/index';
import BiComponent from "@components/bi/index"

export default function Index() {
	return (
		<Base
			appBarChild={<NewMenu/>}
			mainContainerChild= {<BiComponent form='usuario' type='open'/>}
			footerChild={<FooterMain />}
		/>
	);
}
