import { Box, CardMedia, Grid, Typography } from "@mui/material";
import { theme } from "src/core/theme";

function createMonthlyAccess(month: string, qty: string) {
	return { month, qty };
}

const rows2024 = [
	createMonthlyAccess('Janeiro', '267'),
	createMonthlyAccess('Fevereiro', '235'),
	createMonthlyAccess('Março', '246'),
];

const rows2023 = [
	createMonthlyAccess('Abril', '50'),
	createMonthlyAccess('Maio', '197'),
	createMonthlyAccess('Junho', '259'),
	createMonthlyAccess('Julho', '206'),
	createMonthlyAccess('Agosto', '298'),
	createMonthlyAccess('Setembro', '458'),
	createMonthlyAccess('Outubro', '465'),
	createMonthlyAccess('Novembro', '587'),
	createMonthlyAccess('Dezembro', '448'),
];

export default function Index() {
	return (
		<>
			<Box sx={{
				position: 'justify',
				bgcolor: theme.primaryColor,
				marginX: 'auto',
				maxWidth: '50rem',
				height: 'auto',
				marginTop: '6rem',
			}}
			>
				<Typography
					sx={{ padding: 2 }}
					textAlign={'center'}
					variant="h4"
					color={theme.white}
				>
					O que é GestBucal SD
				</Typography>
			</Box>

			<Box sx={{
				position: 'justify',
				bgcolor: theme.greyLight,
				marginX: 'auto',
				maxWidth: '50rem',
				height: 'auto',
				marginBottom: '1rem',
			}}
			>
				<Typography
					sx={{ padding: 1.5 }}
					textAlign={'center'}
					variant="body1"
					color={theme.black}
				>
					A plataforma GestBucalSD é uma ferramenta web-based de autoprocessamento de dados para monitorar e avaliar a saúde bucal.
				</Typography>
				<Typography
					sx={{ padding: 1.5 }}
					textAlign={'center'}
					variant="body1"
					color={theme.black}
				>
					Ela permite o processamento automático de dados coletados nas unidades de saúde, gerando informações úteis para monitorar e avaliar a situação da saúde bucal da população.
				</Typography>
				<Typography
					sx={{ padding: 1.5 }}
					textAlign={'center'}
					variant="body1"
					color={theme.black}
				>
					Com essa plataforma, os usuários podem acessar diferentes módulos operacionais que oferecem indicadores, gráficos, mapas e relatórios sobre a qualidade e a efetividade dos serviços de atenção em saúde bucal.
				</Typography>
				<Typography
					sx={{ padding: 1.5 }}
					textAlign={'center'}
					variant="body1"
					color={theme.black}
				>
					Assim, a GestBucalSD contribui para a governança inteligente e a melhoria contínua da rede de atenção em saúde bucal.
				</Typography>
			</Box>
			<Box sx={{
				position: 'justify',
				bgcolor: theme.primaryColor,
				marginX: 'auto',
				maxWidth: '50rem',
				height: 'auto',
			}}
			>
				<Typography sx={{
					padding: 2,
				}}
					textAlign={'center'}
					variant="h4"
					color={theme.white}

				>
					Parceiros
				</Typography>
			</Box>

			<Box sx={{
				position: 'justify',
				bgcolor: theme.greyLight,
				marginX: 'auto',
				maxWidth: '50rem',
				height: 'auto',
				marginBottom: '1rem',
			}}
			>
				<Grid
					container
					justifyContent="center"
					alignItems="center"
				>
					<Grid item xs>
						<CardMedia
							component="img"
							image="https://i.imgur.com/cI60QB5.png"
							alt="Logo SUS"
							sx={{
								marginLeft: '10px',
								width: '90%',
							}}
						/>
					</Grid>

					<Grid item xs>
						<CardMedia
							component="img"
							image="https://i.imgur.com/n2myEZg.png"
							alt="Logo Conselho Regional de Odontologia de Pernambuco"
							sx={{
								width: '80%',
							}}
						/>

					</Grid>

					<Grid item xs>
						<CardMedia
							component="img"
							image="https://i.imgur.com/9UbYlhV.png"
							alt="Logo FACEPE"
							sx={{
								width: '80%',
							}}
						/>
					</Grid>

				</Grid>

				<Grid
					container
					justifyContent="center"
					alignItems="center"
				>
					<Grid item xs>
						<CardMedia
							component="img"
							image="https://i.imgur.com/ZedrNah.png"
							alt="Logo CNPq"
							sx={{
								marginLeft: '10px',
								width: '80%',
							}}
						/>
					</Grid>

					<Grid item xs>
						<CardMedia
							component="img"
							image="https://i.imgur.com/Z1oobdG.png"
							alt="Logo UFPE"
							sx={{
								width: '80%',
								marginBottom: '1rem'
							}}
						/>
					</Grid>

					<Grid item xs>
						<CardMedia
							component="img"
							image="https://i.imgur.com/B1VsMhf.png"
							alt="Logo do Governo do Estado de Pernambuco"
							sx={{
								width: '80%',
							}}
						/>
					</Grid>
				</Grid>

				<Grid
					container
					justifyContent="center"
					alignItems="center"
				>
					<Grid item xs>

					</Grid>

					<Grid item xs>

					</Grid>
				</Grid>
			</Box>

			<Box sx={{
				position: 'justify',
				bgcolor: theme.primaryColor,
				marginX: 'auto',
				maxWidth: '50rem',
				height: 'auto',
			}}
			>
				<Typography
					sx={{ padding: 2 }}
					textAlign={'center'}
					variant="h4"
					color={theme.white}
				>
					Números do GestBucal SD
				</Typography>
			</Box>
			<Box sx={{
				position: 'justify',
				bgcolor: theme.greyLight,
				marginX: 'auto',
				maxWidth: '50rem',
				height: 'auto',
				marginBottom: '1rem',
			}}
			>
				<Grid
					container
					justifyContent="center"
					alignItems="center"
				>
					<Grid item xs>
						<Typography
							textAlign={'center'}
							variant="h6"
							color={theme.black}
						>
							720
						</Typography>
					</Grid>

					<Grid item xs>
						<Typography
							textAlign={'center'}
							variant="h6"
							color={theme.black}
						>
							24
						</Typography>
					</Grid>

					<Grid item xs>
						<Typography
							textAlign={'center'}
							variant="h6"
							color={theme.black}
						>
							256
						</Typography>
					</Grid>
				</Grid>

				<Grid
					container
					justifyContent="center"
					alignItems="center"
				>
					<Grid item xs>
						<Typography
							textAlign={'center'}
							variant="h6"
							color={theme.black}
						>
							Usuários Cadastrados
						</Typography>
					</Grid>

					<Grid item xs>
						<Typography
							textAlign={'center'}
							variant="h6"
							color={theme.black}
						>
							Municípios Parceiros
						</Typography>
					</Grid>

					<Grid item xs>
						<Typography
							textAlign={'center'}
							variant="h6"
							color={theme.black}
						>
							Artigos no Acervo
						</Typography>
					</Grid>
				</Grid>
			</Box>
			<Box sx={{
				position: 'justify',
				bgcolor: theme.primaryColor,
				marginX: 'auto',
				maxWidth: '50rem',
				height: 'auto',
			}}
			>
				<Typography
					sx={{ padding: 2 }}
					textAlign={'center'}
					variant="h4"
					color={theme.white}
				>
					Acessos Mensais
				</Typography>
			</Box>
			<Box sx={{
				position: 'justify',
				bgcolor: theme.greyLight,
				marginX: 'auto',
				maxWidth: '50rem',
				height: 'auto',
				marginBottom: '1rem',
			}}
			>
				{/* 2024 */}
				<Typography
					sx={{ padding: 2, fontWeight: 'bold' }}
					textAlign={'center'}
					variant="h4"
					color={theme.black}
				>
					2024
				</Typography>
				<Grid container spacing={2}>
					{rows2024.map((row) => (
						<Grid key={row.month} item xs={4}
						>
							<Typography textAlign={'center'}
								sx={{ fontWeight: 'bold' }}
								variant="h6"
								color={theme.black}>
								{row.month}
							</Typography>
							<Typography textAlign={'center'}
								variant="h6"
								color={theme.black}>
								{row.qty}
							</Typography>
						</Grid>
					))}
				</Grid>


				{/* 2023 */}
				<Typography
					sx={{ padding: 2, fontWeight: 'bold' }}
					textAlign={'center'}
					variant="h4"
					color={theme.black}
				>
					2023
				</Typography>
				<Grid container spacing={2}>
					{rows2023.map((row) => (
						<Grid key={row.month} item xs={4}
						>
							<Typography textAlign={'center'}
								sx={{ fontWeight: 'bold' }}
								variant="h6"
								color={theme.black}>
								{row.month}
							</Typography>
							<Typography textAlign={'center'}
								variant="h6"
								color={theme.black}>
								{row.qty}
							</Typography>
						</Grid>
					))}
				</Grid>
			</Box>
		</>
	)
}