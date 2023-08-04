import { titleStyle } from '@components/menu/simple-menu/style';
import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { MENU_ITEM } from '../items/type';
import { TProps } from './type';

export default function Index(props: TProps) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		props.onClick();
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleSelectItem = (item: MENU_ITEM) => {
		handleClose();
		item.onClick();
	};

	return (
		<div>
			<Button
				onClick={handleClick}
				style={titleStyle}
			>
				{props.title}
			</Button>

			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				{props.menuItems?.map((item, index) => (
					<MenuItem
						key={index}
						onClick={() => handleSelectItem(item)}
					>
						{item.title}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}
