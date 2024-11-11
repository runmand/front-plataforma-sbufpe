import { Box, List, ListItem, ListItemButton, Typography } from '@mui/material';
import { theme } from 'src/core/theme';
import { TPROPS } from './type';
import { containerBodyTypeEnum, routerEnum, } from 'src/core/enums';
import { useRouter } from 'next/router';

const infoList = [

	{
		title: 'Sobre',
		items: [
			{
				title: 'Quem somos?',
				url: routerEnum.TEAM,
			},
			{
				title: 'O que é GestBucal',
				url: routerEnum.PROJECT,
			},
			{
				title: 'TCLE',
				url: routerEnum.TCLE,
			},
		],
	},
	{
		title: 'Endereço',
		items: [
			{
				title: 'Avenida Prof. Moraes Rego, 1235\nCidade Universitária\nRecife PE, 50670-901',
				url: containerBodyTypeEnum.DIRECTION,
			},
		]
	},
	{
		title: 'Suporte',
		items: [
			{
				title: 'Central SAC | +55(81)3194-4900\nDuvidas | +55(81)3038-6405',
				url: routerEnum.CONTACTUS,
			},
			
		],
	},
];

export default function Index() {
	const router = useRouter();

	function handleClick(url: string) {
		router.push(url)
	}

	return (
		<Box
			sx={{
				display:'flex',
				flexDirection:'column',
				justifyContent:'center',
				alignItems:'center',
				backgroundColor: theme.primaryColor,
				width:'100%'
			}}>
					<Box
						sx={{
							display: 'flex',
							flexWrap:'wrap',
							justifyContent: 'center',
							}}>
					{infoList.map((info, index) =>(
						<Typography
						key={index}
						variant={'subtitle1'}
						sx={{
							color:theme.white,
							textTransform:'uppercase',
							textAlign:'center'
						}}>
						{info.title}
						<List
							disablePadding
							sx={{marginX:'1rem'}}>
							{info.items.map((item, i) => (
								<ListItem
									key={i}
									disablePadding
									sx={{
										marginY:'0.5rem',
										marginX:'1rem',
									}}>
									<ListItemButton
										style={{
											padding: 0,
											fontSize: '0.8rem',
											fontWeight: 'bold',
											color: theme.white,
											whiteSpace: 'pre-line',
											marginLeft:'1rem'
										}}
										onClick={()=> handleClick(item.url)}
											>
										{item.title}
									</ListItemButton>
								</ListItem>
							))}
						</List>
					</Typography>
					))}
					</Box>
					<span 
					style={{
						color:theme.white,
						backgroundColor:theme.secundaryColor,
						width:'100%',
						font:'bold',
						textAlign:'center'
				}}>GESTBUCAL&copy; - 2023</span>
				
		</Box>

	);
}
