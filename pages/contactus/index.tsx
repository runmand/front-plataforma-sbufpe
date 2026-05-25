import Head from 'next/head';
import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index'
import ContactUsContainer from '@components/container/contact-us';

export default function Index() {
	return (
		<>
			<Head>
				<title>Contato | GestBucal</title>
			</Head>
			<Base
				appBarChild={<NewMenu/>}
				mainContainerChild={<ContactUsContainer/>}
			/>
		</>
	);
}
