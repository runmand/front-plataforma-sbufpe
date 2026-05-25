import Head from 'next/head';
import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index'
import ApsData from '@components/container/aps-data';
import FooterMain from '@components/footer/main/index';
import BiComponent from "@components/bi/index"

export default function Index() {
	return (
		<>
			<Head>
				<title>Dados APS | GestBucal</title>
			</Head>
			<Base
				appBarChild={<NewMenu/>}
				mainContainerChild= {<BiComponent form='aps' type='open'/>}
				footerChild={<FooterMain />}
			/>
		</>
	);
}
