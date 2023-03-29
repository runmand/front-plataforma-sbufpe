/* eslint-disable @next/next/no-img-element */
import { ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import { iconStyle, mainContainerStyle, photoCardStyle, photoContainerStyle, titleStyle } from './style';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { theme } from 'src/core/theme';
import { people } from "src/shared/dataBase"

export default function Index() {

	//TODO: Criar constantes para as keys dos contatos.


	return (
		<div style={mainContainerStyle}>
			<Typography
				variant='h2'
				sx={{
					color:theme.white,
					textAlign:'center',
					fontWeight:'bold',
					padding:'2%'
				}}
			>
				Nossa equipe
			</Typography>

			<div style={photoContainerStyle}>
				{people.map((item, index) => (
					<ImageListItem
						key={index}
						style={photoCardStyle}
					>
						<img
							src={item.photo}
							srcSet={item.photo}
							alt={item.photo}
							loading='eager'
						/>

						<ImageListItemBar
							title={item.name}
							subtitle={item.role}
							sx={{bgcolor:theme.blur}}
							actionIcon={
								<div>
									{(() => {
										let linkedInObj = item.contacts.filter(item => item.id === 'linked-in')[0];

										if (linkedInObj) {
											return (
												<LinkedInIcon
													color='primary'
													style={iconStyle}
													onClick={() => window.open(linkedInObj.url, '_blank')}
												/>
											);
										}
									})()}
									{(() => {
										let cnpq = item.contacts.filter(item => item.id === 'cnpq')[0];

										if (cnpq) {
											return (
												<AccountCircleIcon
													color='primary'
													style={iconStyle}
													onClick={() => window.open(cnpq.url, '_blank')}
												/>
											);
										}
									})()}
								</div>
							}
						/>
					</ImageListItem>
				))}
			</div>
		</div>
	);
}
