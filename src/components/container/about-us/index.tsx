import {
	Grid,
	Box,
	Typography,
	Avatar,
	Paper,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { theme } from 'src/core/theme';
import { coordTeam, searchTeacherTeam, tecTeam } from "src/shared/dataBase";

export default function Index() {
	return (
		<>
			<Typography
				variant='h2'
				sx={{
					color: theme.primaryColor,
					textAlign: 'center',
					fontWeight: 'bold',
					paddingY: '2rem'
				}}
			>
				Nossa equipe
			</Typography>
			<Box sx={{
				position: 'justify',
				bgcolor: theme.primaryColor,
				marginX: 'auto',
				maxWidth: '50rem',
				height: 'auto'
			}}>
				<Typography sx={{ padding: 2 }}
					textAlign={'center'}
					variant='h4'
					color={theme.white}>
					Coordenadores
				</Typography>
			</Box>
			<Grid container
				gap={2}
				sx={{
					justifyContent: 'center',
					padding: '1rem',
				}}>
				{(coordTeam.map((item, index) => (
					<Paper
						key={index}
						sx={{
							width: '21rem',
							height: '13rem',
							display: 'flex',
							alignContent: 'center',
							padding: '1px',
							margin: '0.75rem',
							bgcolor: 'white',
						}}
					>
						<Box
							sx={{
								width: '50%',
								display: 'flex',
								justifyContent: 'center',
								alignContent: 'center',
								flexWrap: 'wrap',
							}}>
							<Avatar
								alt={item.name}
								src={item.photo}
								sx={{
									height: 1,
									width: '100%',
								}} />
						</Box>
						<Box
							sx={{
								width: '8rem',
								display: 'flex',
								flexDirection: 'column',
								textAlign: 'center',
								gap: '0.5rem',
							}}>
							<Typography
								variant='h4'
								color={theme.secundaryColor}>
								{item.name}
							</Typography>
							<Typography
								color={theme.primaryColor}>
								{item.role}
							</Typography>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-around',

								}}>
								<>
									{(() => {
										let linkedInObj = item.contacts.filter(item => item.id === 'linked-in')[0];

										if (linkedInObj) {
											return (
												<LinkedInIcon
													color='action'
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
													color='action'
													onClick={() => window.open(cnpq.url, '_blank')}
												/>
											);
										}
									})()}
								</>
							</Box>
						</Box>
					</Paper>
				)))}
			</Grid>
			<Box sx={{
				position: 'justify',
				bgcolor: theme.primaryColor,
				marginX: 'auto',
				maxWidth: '50rem',
				height: 'auto'
			}}>
				<Typography sx={{ padding: 2 }}
					textAlign={'center'}
					variant='h4'
					color={theme.white}>
					Pesquisadores e Professores
				</Typography>
			</Box>
			<Grid container
				gap={2}
				sx={{
					justifyContent: 'center',
					padding: '1rem',
				}}>
				{(searchTeacherTeam.map((item, index) => (
					<Paper
						key={index}
						sx={{
							width: '21rem',
							height: '13rem',
							display: 'flex',
							alignContent: 'center',
							padding: '1px',
							margin: '0.75rem',
							bgcolor: 'white',
						}}
					>
						<Box
							sx={{
								width: '50%',
								display: 'flex',
								justifyContent: 'center',
								alignContent: 'center',
								flexWrap: 'wrap',
							}}>
							<Avatar
								alt={item.name}
								src={item.photo}
								sx={{
									height: 1,
									width: '100%',
								}} />
						</Box>
						<Box
							sx={{
								width: '8rem',
								display: 'flex',
								flexDirection: 'column',
								textAlign: 'center',
								gap: '0.5rem',
							}}>
							<Typography
								variant='h4'
								color={theme.secundaryColor}>
								{item.name}
							</Typography>
							<Typography
								color={theme.primaryColor}>
								{item.role}
							</Typography>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-around',

								}}>
								<>
									{(() => {
										let linkedInObj = item.contacts.filter(item => item.id === 'linked-in')[0];

										if (linkedInObj) {
											return (
												<LinkedInIcon
													color='action'
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
													color='action'
													onClick={() => window.open(cnpq.url, '_blank')}
												/>
											);
										}
									})()}
								</>
							</Box>
						</Box>
					</Paper>
				)))}
			</Grid>
			<Box sx={{
				position: 'justify',
				bgcolor: theme.primaryColor,
				marginX: 'auto',
				maxWidth: '50rem',
				height: 'auto'
			}}>
				<Typography sx={{ padding: 2 }}
					textAlign={'center'}
					variant='h4'
					color={theme.white}>
					Equipe Técnica
				</Typography>
			</Box>
			<Grid container
				gap={2}
				sx={{
					justifyContent: 'center',
					padding: '1rem',
				}}>
				{(tecTeam.map((item, index) => (
					<Paper
						key={index}
						sx={{
							width: '21rem',
							height: '13rem',
							display: 'flex',
							alignContent: 'center',
							padding: '1px',
							margin: '0.75rem',
							bgcolor: 'white',
						}}
					>
						<Box
							sx={{
								width: '50%',
								display: 'flex',
								justifyContent: 'center',
								alignContent: 'center',
								flexWrap: 'wrap',
							}}>
							<Avatar
								alt={item.name}
								src={item.photo}
								sx={{
									height: 1,
									width: '100%',
								}} />
						</Box>
						<Box
							sx={{
								width: '8rem',
								display: 'flex',
								flexDirection: 'column',
								textAlign: 'center',
								gap: '0.5rem',
							}}>
							<Typography
								variant='h4'
								color={theme.secundaryColor}>
								{item.name}
							</Typography>
							<Typography
								color={theme.primaryColor}>
								{item.role}
							</Typography>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-around',

								}}>
								<>
									{(() => {
										let linkedInObj = item.contacts.filter(item => item.id === 'linked-in')[0];

										if (linkedInObj) {
											return (
												<LinkedInIcon
													color='action'
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
													color='action'
													onClick={() => window.open(cnpq.url, '_blank')}
												/>
											);
										}
									})()}
								</>
							</Box>
						</Box>
					</Paper>
				)))}
			</Grid>
		</>
	);
}
