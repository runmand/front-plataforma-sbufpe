import Head from 'next/head';
import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index'
import NotFoundComponent from '@components/not-found'
import FooterMain from '@components/footer/main/index';

export default function Index() {
	return (
		<>
			<Head>
				<title>Página não encontrada | GestBucal</title>
			</Head>
			<Base
				appBarChild={<NewMenu/>}
				mainContainerChild={<NotFoundComponent/>}
				footerChild={<FooterMain />}
			/>
		</>
	);
}
