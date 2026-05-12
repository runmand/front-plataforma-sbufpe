import Head from 'next/head';
import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index'
import Faq from '@components/container/faq';
import FooterMain from '@components/footer/main/index';

export default function Index() {
	return (
		<>
			<Head>
				<title>FAQ | GestBucal</title>
			</Head>
			<Base
				appBarChild={<NewMenu/>}
				mainContainerChild={<Faq/>}
				footerChild={<FooterMain />}
			/>
		</>
	);
}
