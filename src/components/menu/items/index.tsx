import { Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { TPROPS } from './type';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { theme } from 'src/core/theme';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import router from 'next/router';
import { routerEnum } from 'src/core/enums';

//TODO: Corrigir os icons de acordo com item do menu correspondente
export default function Index(props: TPROPS) {
	const [isOpen, setIsOpen] = React.useState<boolean>(false);

	const handleOnSelectMenuItem = () => {
		setIsOpen(!isOpen);
		router.push(routerEnum.FORM);
	};

	return (
		<div>
			<ListItem
				disablePadding
				style={{ paddingLeft: `${props.incrementalLeftChildMargin}rem` }}
				onClick={() => handleOnSelectMenuItem()}
			>
				<ListItemButton>
					<ListItemIcon>{(props.item.id as number) % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
					<ListItemText primary={props.item.title} />
					{props.item.menuItemChildren?.length > 0 ? isOpen ? <ExpandLess /> : <ExpandMore /> : ''}
				</ListItemButton>
			</ListItem>

			{props.item.menuItemChildren?.length > 0 && (
				<Collapse
					in={isOpen}
					timeout='auto'
					unmountOnExit
				>
					<List>
						{props.item.menuItemChildren.map((child, index) => (
							<Index
								key={index}
								parentId={props.item.id}
								item={child}
								incrementalLeftChildMargin={props.incrementalLeftChildMargin + theme.menus.drawer.incrementalLeftChildMargin}
							/>
						))}
					</List>
				</Collapse>
			)}

			{!props.parentId && <Divider />}
		</div>
	);
}
