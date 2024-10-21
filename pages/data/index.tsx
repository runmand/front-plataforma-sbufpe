import AppBar from "@components/app-bar/index";
import HomeToolbar from "@components/toolbar/home";
import Base from "@components/base-layout/index";
import Data from "@components/data/index"

export default function Index() {
  return (
    <Base
      appBarChild={<AppBar toolbarChild={<HomeToolbar />} />}
      mainContainerChild={<Data></Data>}/>
  )
}
