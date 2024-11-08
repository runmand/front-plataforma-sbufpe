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
import { teacherTeamGI, teacherTeamTI, studentTeamTI, studentsTeamGI } from "src/shared/dataBase";

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
			<Typography
				variant='h4'
				sx={{
					color: theme.primaryColor,
					textAlign: 'center',
					fontWeight: 'bold',
				}}
			>
				Equipe de Gestão da Informação
			</Typography>
			<Typography
				variant='h5'
				sx={{
					color: theme.primaryColor,
					textAlign: 'center',
					fontWeight: 'bold',
					paddingBottom: '2rem',
				}}
			>
				Conduzem a pesquisa-ação
			</Typography>
			<Box sx={{
				position: 'justify',
				bgcolor: theme.primaryColor,
				marginX: 'auto',
				maxWidth: '50rem',
				height: 'auto',
			}}>
				<Typography
					sx={{
						padding: 1.5,
					}}
					textAlign={'center'}
					variant='h4'
					color={theme.white}>
					Docentes
				</Typography>
			</Box>
			<Grid container
				gap={2}
				sx={{
					justifyContent: 'center',
					padding: '1rem',
				}}>
				{(teacherTeamGI.map((item, index) => (
					<Paper
						key={index}
						sx={{
							width: '20rem',
							height: '8rem',
							display: 'flex',
							alignItems: 'center',
							padding: '1rem',
							margin: '0.75rem',
							bgcolor: 'white',
							gap: '1rem'
						}}
					>
						<Box
							sx={{
								width: '30%',
								display: 'flex',
								justifyContent: 'center',
								flexWrap: 'wrap',
							}}>
							<Avatar
								alt={item.name}
								src={item.photo}
								sx={{
									height: '95px',
									width: '95px',
								}} />
						</Box>
						<Box
							sx={{
								width: '70%',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-start',
								textAlign: 'left',
								gap: '0.3rem',
							}}>
							<Typography
								variant='h5'
								color={theme.secundaryColor}
								sx={{
									fontSize: '1.1rem',
									fontWeight: 'bold',
								}}
							>
								{item.name}
							</Typography>
							<Typography
								color={theme.primaryColor}
								sx={{
									fontSize: '0.9rem',
								}}
							>
								{item.role}
							</Typography>
							<Box
								sx={{
									display: 'flex',
									gap: '0.5rem',
									marginTop: '0.5rem',

								}}>
								<>
									{(() => {
										let linkedInObj = item.contacts.filter(item => item.id === 'linked-in')[0];

										if (linkedInObj) {
											return (
												<LinkedInIcon
													sx={{ cursor: 'pointer' }}
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
													sx={{ cursor: 'pointer' }}
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
				<Typography sx={{ padding: 1.5 }}
					textAlign={'center'}
					variant='h4'
					color={theme.white}>
					Discentes
				</Typography>
			</Box>
			<Grid container
				gap={2}
				sx={{
					justifyContent: 'center',
					padding: '1rem',
				}}>
				{(studentsTeamGI.map((item, index) => (
					<Paper
						key={index}
						sx={{
							width: '20rem',
							height: '8rem',
							display: 'flex',
							alignItems: 'center',
							padding: '1rem',
							margin: '0.75rem',
							bgcolor: 'white',
							gap: '1rem'
						}}
					>
						<Box
							sx={{
								width: '30%',
								display: 'flex',
								justifyContent: 'center',
								flexWrap: 'wrap',
							}}>
							<Avatar
								alt={item.name}
								src={item.photo}
								sx={{
									height: '95px',
									width: '95px',
								}} />
						</Box>
						<Box
							sx={{
								width: '70%',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-start',
								textAlign: 'left',
								gap: '0.3rem',
							}}>
							<Typography
								variant='h5'
								sx={{
									fontSize: '1.1rem',
									fontWeight: 'bold',
								}}
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
													sx={{ cursor: 'pointer' }}
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
													sx={{ cursor: 'pointer' }}
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
			<Typography
				variant='h4'
				sx={{
					color: theme.primaryColor,
					textAlign: 'center',
					fontWeight: 'bold',
				}}
			>
				Equipe de Tecnologia da Informação
			</Typography>
			<Typography
				variant='h5'
				sx={{
					color: theme.primaryColor,
					textAlign: 'center',
					fontWeight: 'bold',
					paddingBottom: '2rem',
				}}
			>
				Atuam no desenvolvimento da plataforma e suporte técnico à execução da pesquisa.
			</Typography>
			<Box sx={{
				position: 'justify',
				bgcolor: theme.primaryColor,
				marginX: 'auto',
				maxWidth: '50rem',
				height: 'auto'
			}}>
				<Typography sx={{ padding: 1.5 }}
					textAlign={'center'}
					variant='h4'
					color={theme.white}>
					Docentes
				</Typography>
			</Box>
			<Grid container
				gap={2}
				sx={{
					justifyContent: 'center',
					padding: '1rem',
				}}>
				{(teacherTeamTI.map((item, index) => (
					<Paper
						key={index}
						sx={{
							width: '20rem',
							height: '8rem',
							display: 'flex',
							alignItems: 'center',
							padding: '1rem',
							margin: '0.75rem',
							bgcolor: 'white',
							gap: '1rem'
						}}
					>
						<Box
							sx={{
								width: '30%',
								display: 'flex',
								justifyContent: 'center',
								flexWrap: 'wrap',
							}}>
							<Avatar
								alt={item.name}
								src={item.photo}
								sx={{
									height: '95px',
									width: '95px',
								}} />
						</Box>
						<Box
							sx={{
								width: '70%',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-start',
								textAlign: 'left',
								gap: '0.3rem',
							}}>
							<Typography
								variant='h5'
								sx={{
									fontSize: '1.1rem',
									fontWeight: 'bold',
								}}
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
													sx={{ cursor: 'pointer' }}
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
													sx={{ cursor: 'pointer' }}
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
				<Typography sx={{ padding: 1.5 }}
					textAlign={'center'}
					variant='h4'
					color={theme.white}>
					Discentes
				</Typography>
			</Box>
			<Grid container
				gap={2}
				sx={{
					justifyContent: 'center',
					padding: '1rem',
				}}>
				{(studentTeamTI.map((item, index) => (
					<Paper
						key={index}
						sx={{
							width: '20rem',
							height: '8rem',
							display: 'flex',
							alignItems: 'center',
							padding: '1rem',
							margin: '0.75rem',
							bgcolor: 'white',
							gap: '1rem'
						}}
					>
						<Box
							sx={{
								width: '30%',
								display: 'flex',
								justifyContent: 'center',
								flexWrap: 'wrap',
							}}>
							<Avatar
								alt={item.name}
								src={item.photo}
								sx={{
									height: '95px',
									width: '95px',
								}} />
						</Box>
						<Box
							sx={{
								width: '70%',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-start',
								textAlign: 'left',
								gap: '0.3rem',
							}}>
							<Typography
								variant='h5'
								sx={{
									fontSize: '1.1rem',
									fontWeight: 'bold',
								}}
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
													sx={{ cursor: 'pointer' }}
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
													sx={{ cursor: 'pointer' }}
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
