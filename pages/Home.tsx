import Base from '@components/base-layout/index';
import Appbar from '@components/app-bar/index';
import HomeToolbar from '@components/toolbar/home';

export default function Home() {
	return (
		<div>
			<Base
				appBarChild={<Appbar toolbarChild={<HomeToolbar />} />}
				mainContainerChild={<div></div>}
			/>
		</div>
	);
}
