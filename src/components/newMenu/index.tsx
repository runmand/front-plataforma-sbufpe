import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { theme } from 'src/core/theme';
import MenuItems from "./items/index"
import { useRouter } from 'next/router';
import { titleEnumPtBr } from 'src/core/enums';

export default function Index() {
	const router = useRouter();
	
	const routeName = router.pathname;

	React.useEffect(() =>{
		try {
			let title = titleEnumPtBr[routeName as keyof typeof titleEnumPtBr];		

			if (title == undefined) throw new Error("Page Not found");
		
			document.title = `GestBucal SD - ${title}`;
		} catch (error) {
			document.title = `GestBucal SD`;
		}
			// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
  <AppBar 
		sx={{
			position: 'fixed',
			width: '100%',
			height: '12%',
			display: 'flex',
			padding:'0.75rem',
			justifyContent: 'center',
			backgroundColor: theme.primaryColor}}
  >
  <MenuItems></MenuItems>

  </AppBar>);
}