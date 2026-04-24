import Base from "@components/base-layout/index";
import NewMenu from "@components/newMenu/index";
import HomeComponent from "@components/container/home";
import FooterMain from "@components/footer/main/index";

export default function Index() {
    return <Base appBarChild={<NewMenu />} mainContainerChild={<HomeComponent />} footerChild={<FooterMain />} />;
}
