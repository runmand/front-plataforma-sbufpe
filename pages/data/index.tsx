import Head from 'next/head';
import Base from "@components/base-layout/index";
import NewMenu from "@components/newMenu/index";
import Data from "@components/data/page";
import FooterMain from "@components/footer/main/index";

export default function Index() {
    return (
        <>
            <Head>
                <title>Exportar Dados | GestBucal</title>
            </Head>
            <Base appBarChild={<NewMenu />} mainContainerChild={<Data />} footerChild={<FooterMain />} />
        </>
    );
}
