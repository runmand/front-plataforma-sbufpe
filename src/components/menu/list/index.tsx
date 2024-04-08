import { List } from '@mui/material';
import { TPROPS } from './type';
import MenuItems from '@components/menu/items/index';
import { listStyle } from './style';

export default function Index(props: TPROPS) {
	return (
		<List style={listStyle}>
			{props.items.map((item, index) => (
				<MenuItems
					key={index}
					item={item}
					incrementalLeftChildMargin={0}
				/>
			))}
		</List>
	);
}
