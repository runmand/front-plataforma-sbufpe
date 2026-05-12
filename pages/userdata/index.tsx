import Head from 'next/head';
import Base from '@components/base-layout/index';
import NewMenu from '@components/newMenu/index'
import UserData from '@components/container/user-data';
import FooterMain from '@components/footer/main/index';
import BiComponent from "@components/bi/index"

export default function Index() {
	return (
		<>
			<Head>
				<title>Dados do Usuário | GestBucal</title>
			</Head>
			<Base
				appBarChild={<NewMenu/>}
				mainContainerChild= {<BiComponent form='usuario' type='open'/>}
				footerChild={<FooterMain />}
			/>
		</>
	);
}
