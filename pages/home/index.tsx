import Base from '@components/base-layout/index';
import Appbar from '@components/app-bar/index';
import HomeToolbar from '@components/toolbar/home';

export default function Index() {
	return (
		<Base
			appBarChild={<Appbar toolbarChild={<HomeToolbar />} />}
			mainContainerChild={<div></div>} //TODO: Remover essa div e acidionar o component body da home page
		/>
	);
}
