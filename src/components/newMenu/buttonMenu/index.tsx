'use client';

import { TProps } from './type';
import { Button, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import { routerEnum } from 'src/core/enums';
import { theme } from 'src/core/theme';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Index(props: TProps) {
  const router = useRouter();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const element = props.element
	const sublist = element.subList;
	const haveSubList = sublist?.length > 0;
	const largeQuery = useMediaQuery('(min-width:720px)')
	
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget); 
  };

	const handleClose = () => {
		setAnchorEl(null);
	};

	function pushRoute(route: routerEnum) {
		if (route !== undefined) router.push(route);
	}

	return (
		<div>
			<Button
					style={{
						fontWeight: 'bold',
						color: !largeQuery? theme.black : theme.white,
						// fontSize: largeQuery ? '0.875rem' : '0.7rem'
					}}
					onClick={haveSubList ? handleClick : () => pushRoute(element.route)}>
					{element.title}
			</Button>
		
      {sublist && sublist.length > 0 ? (
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose} >
          {sublist.map((item, index) => (
            <MenuItem key={index} onClick={() => pushRoute(item.route)}>
              {item.title}
            </MenuItem>
          ))}
        </Menu>
      ) : null}		
		</div>
	);
}
