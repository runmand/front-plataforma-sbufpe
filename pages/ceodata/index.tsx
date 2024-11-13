import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index'
import CeoData from '@components/container/ceo-data';
import FooterMain from '@components/footer/main/index';
import BiComponent from "@components/bi/index"

export default function Index() {
	return (
		<Base
			appBarChild={<NewMenu/>}
			mainContainerChild= {<BiComponent form='ceo' type='open'/>}
			footerChild={<FooterMain />}
		/>
	);
}
