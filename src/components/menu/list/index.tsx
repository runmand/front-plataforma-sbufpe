import { List } from '@mui/material';
import { TProps } from './type';
import MenuItems from '@components/menu/items/index';
import { listStyle } from './style';

export default function Index(props: TProps) {
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
