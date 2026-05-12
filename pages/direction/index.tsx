import Head from 'next/head';
import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index'
import DirectionComponent from '@components/container/direction'
import FooterMain from '@components/footer/main/index';

export default function Index() {
	return (
		<>
			<Head>
				<title>Diretoria | GestBucal</title>
			</Head>
			<Base
				appBarChild={<NewMenu/>}
				mainContainerChild={<DirectionComponent/>}
				footerChild={<FooterMain />}
			/>
		</>
	);
}
