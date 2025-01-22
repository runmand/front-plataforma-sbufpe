import AppBar from "@components/app-bar/index";
import HomeToolbar from "@components/toolbar/home";
import Base from "@components/base-layout/index";
import Data from "@components/data/index"
import NewMenu from '@components/newMenu/index'
import FooterMain from '@components/footer/main/index';

export default function Index() {
  return (
    <Base
      appBarChild={<NewMenu/>}
      mainContainerChild={<Data/>}
    />
  )
}
