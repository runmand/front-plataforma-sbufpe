import Base from "@components/base-layout/index";
import NewMenu from "@components/newMenu/index";
import Data from "@components/data/page";
import FooterMain from "@components/footer/main/index";

export default function Index() {
    return <Base appBarChild={<NewMenu />} mainContainerChild={<Data />} footerChild={<FooterMain />} />;
}
