import { Box, CardMedia, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { routerEnum } from "src/core/enums";
import { theme } from "src/core/theme";

interface AccessData {
	year: number;
	month: string;
	qty: string;
}

function createMonthlyAccess({ year, month, qty }: AccessData) {
	return { year, month, qty };
}

const rows2025: AccessData[] = [
	createMonthlyAccess({ year: 2025, month: 'Janeiro', qty: '389' }),
	createMonthlyAccess({ year: 2025, month: 'Fevereiro', qty: '352' }),
	createMonthlyAccess({ year: 2025, month: 'Março', qty: '423' }),
];

const rows2024: AccessData[] = [
	createMonthlyAccess({ year: 2024, month: 'Janeiro', qty: '267' }),
	createMonthlyAccess({ year: 2024, month: 'Fevereiro', qty: '235' }),
	createMonthlyAccess({ year: 2024, month: 'Março', qty: '246' }),
	createMonthlyAccess({ year: 2024, month: 'Abril', qty: '439' }),
	createMonthlyAccess({ year: 2024, month: 'Maio', qty: '397' }),
	createMonthlyAccess({ year: 2024, month: 'Junho', qty: '515' }),
	createMonthlyAccess({ year: 2024, month: 'Julho', qty: '658' }),
	createMonthlyAccess({ year: 2024, month: 'Agosto', qty: '684' }),
	createMonthlyAccess({ year: 2024, month: 'Setembro', qty: '523' }),
	createMonthlyAccess({ year: 2024, month: 'Outubro', qty: '428' }),
	createMonthlyAccess({ year: 2024, month: 'Novembro', qty: '512' }),
	createMonthlyAccess({ year: 2024, month: 'Dezembro', qty: '345' }),
];

const rows2023 = [
	createMonthlyAccess({ year: 2023, month: 'Abril', qty: '50' }),
	createMonthlyAccess({ year: 2023, month: 'Maio', qty: '197' }),
	createMonthlyAccess({ year: 2023, month: 'Junho', qty: '259' }),
	createMonthlyAccess({ year: 2023, month: 'Julho', qty: '206' }),
	createMonthlyAccess({ year: 2023, month: 'Agosto', qty: '298' }),
	createMonthlyAccess({ year: 2023, month: 'Setembro', qty: '458' }),
	createMonthlyAccess({ year: 2023, month: 'Outubro', qty: '465' }),
	createMonthlyAccess({ year: 2023, month: 'Novembro', qty: '587' }),
	createMonthlyAccess({ year: 2023, month: 'Dezembro', qty: '448' }),
];

const rows = [...rows2025, ...rows2024, ...rows2023];

export default function Index() {
	const images = [
		{ src: 'https://i.imgur.com/n2myEZg.png', alt: 'Logo Conselho Regional de Odontologia de Pernambuco' },
		{ src: 'https://i.imgur.com/9UbYlhV.png', alt: 'Logo FACEPE' },
		{ src: 'https://i.imgur.com/ZedrNah.png', alt: 'Logo CNPq' },
		{ src: 'https://i.imgur.com/Z1oobdG.png', alt: 'Logo UFPE' },
		{ src: 'https://i.imgur.com/B1VsMhf.png', alt: 'Logo do Governo do Estado de Pernambuco' },
	];

	const [yearFilter, setYearFilter] = useState('');
	const [monthFilter, setMonthFilter] = useState('');
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const filteredRows: AccessData[] = rows.filter((row) => (
		(yearFilter === '' || row.year.toString().includes(yearFilter)) &&
		(monthFilter === '' || row.month.toLowerCase().includes(monthFilter.toLowerCase()))
	));


	const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const rowsToShow: AccessData[] = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

	const largeQuery = useMediaQuery('(min-width:720px)')


	return (
		<Box sx={{
			background: theme.greyLight,
			marginTop: '5rem',
			paddingTop: !largeQuery ? '2rem' : '1rem',
			minHeight: '88vh',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center'
		}}>
			<Box sx={{
				position: 'justify',
				bgcolor: theme.primaryColor,
				marginX: 'auto',
				maxWidth: { xs: '100%', md: '50rem' },
				height: 'auto',
				marginTop: '4rem',
				marginBottom: '2rem',
				px: { xs: 2, md: 0 },
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
				maxWidth: { xs: '100%', md: '80rem' },
				height: 'auto',
				marginBottom: '2rem',
				px: { xs: 2, md: 0 },
			}}
			>
				<Typography
					sx={{ padding: 0.2 }}
					textAlign="start"
					variant="body1"
					color={theme.black}
				>
					A plataforma <strong>GestBucalSD</strong> é uma ferramenta web-based de autoprocessamento de dados projetada para o monitoramento e avaliação da saúde bucal.
				</Typography>
				<Typography
					sx={{ padding: 0.2 }}
					textAlign="start"
					variant="body1"
					color={theme.black}
				>
					Através dela, é possível realizar o processamento automático de dados coletados nas unidades de saúde, gerando informações essenciais para avaliar a situação de saúde bucal da população.
				</Typography>
				<Typography
					sx={{ padding: 0.2 }}
					textAlign="start"
					variant="body1"
					color={theme.black}
				>
					Com diversos módulos operacionais, a plataforma disponibiliza indicadores, gráficos, mapas e relatórios que auxiliam na compreensão da qualidade e efetividade dos serviços de atenção em saúde bucal.
				</Typography>
				<Typography
					sx={{ padding: 0.2 }}
					textAlign="start"
					variant="body1"
					color={theme.black}
				>
					Dessa forma, o <strong>GestBucalSD</strong> contribui para uma governança inteligente e para a melhoria contínua da rede de atenção em saúde bucal.
				</Typography>
				<Typography
					sx={{ padding: 0.2 }}
					textAlign="start"
					variant="body1"
					color={theme.black}
				>
					Acesse a{' '}
					<Link href={routerEnum.HOME} style={{ color: theme.primaryColor, textDecoration: 'none' }}>
						tela inicial
					</Link>{' '}
					para explorar suas funcionalidades.
				</Typography>
			</Box>

			<Box sx={{
				position: 'justify',
				bgcolor: theme.primaryColor,
				marginX: 'auto',
				marginTop: '2rem',
				maxWidth: { xs: '100%', md: '50rem' },
				height: 'auto',
				px: { xs: 2, md: 0 },
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
				width: { xs: '100%', md: '50%' },
				height: 'auto',
				marginBottom: '4rem',
				px: { xs: 2, md: 0 },
			}}
			>
				<Box
					sx={{
						height: '14rem',
						margin: { xs: 2, md: 9 },
					}}
				>
					<Carousel indicators={true} autoPlay>
						{images.map((image, index) => (
							<Grid
								container
								justifyContent="center"
								alignItems="center"
								key={index}
							>
								<Grid item xs>
									<CardMedia
										component="img"
										src={image.src}
										alt={`Image ${index + 1}`}
										sx={{
											width: { xs: '100%', md: '600px' },
											height: { xs: '160px', md: '300px' },
											objectFit: "contain",
											margin: "0 auto"
										}}
									/>
								</Grid>
							</Grid>
						))}
					</Carousel>
				</Box>

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
				marginTop: '2rem',
				maxWidth: { xs: '100%', md: '50rem' },
				height: 'auto',
				px: { xs: 2, md: 0 },
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
			<Box
				sx={{
					bgcolor: theme.greyLight,
					marginX: 'auto',
					width: { xs: '100%', md: '65%' },
					marginY: { xs: '2rem', md: '4rem' },
					px: { xs: 1, md: 0 },
				}}
			>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell align="center">
									<Typography variant="h6" color={theme.black} sx={{ fontSize: '1.5rem' }}>
										Usuários Cadastrados
									</Typography>
								</TableCell>
								<TableCell align="center">
									<Typography variant="h6" color={theme.black} sx={{ fontSize: '1.5rem' }}>
										Municípios Parceiros
									</Typography>
								</TableCell>
								<TableCell align="center">
									<Typography variant="h6" color={theme.black} sx={{ fontSize: '1.5rem' }}>
										Artigos no Acervo
									</Typography>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell align="center">
									<Typography variant="h6" color={theme.black} sx={{ fontWeight: 'bold' }}>
										2.478
									</Typography>
								</TableCell>
								<TableCell align="center">
									<Typography variant="h6" color={theme.black} sx={{ fontWeight: 'bold' }}>
										24
									</Typography>
								</TableCell>
								<TableCell align="center">
									<Typography variant="h6" color={theme.black} sx={{ fontWeight: 'bold' }}>
										291
									</Typography>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
			<Box
				sx={{
					bgcolor: theme.primaryColor,
					marginX: 'auto',
					maxWidth: { xs: '100%', md: '50rem' },
					marginBottom: '1rem',
					px: { xs: 2, md: 0 },
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
			{/* \*/}
			<Box
				sx={{
					bgcolor: theme.greyLight,
					marginX: 'auto',
					width: { xs: '100%', md: '65%' },
					marginY: { xs: '2rem', md: '4rem' },
					px: { xs: 1, md: 0 },
				}}
			>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								{/* Filtro de Ano */}
								<TableCell align="center" sx={{ paddingLeft: "2rem", fontSize: "1.2rem" }}>
									<TextField
										label="Filtrar por ano"
										variant="outlined"
										size="small"
										value={yearFilter}
										onChange={(e) => setYearFilter(e.target.value)}
									/>
								</TableCell>
								{/* Filtro de Mês */}
								<TableCell align="center" sx={{ fontSize: "1.2rem" }}>
									<TextField
										label="Filtrar por mês"
										variant="outlined"
										size="small"
										value={monthFilter}
										onChange={(e) => setMonthFilter(e.target.value)}
									/>
								</TableCell>
								<TableCell align="center" sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
									<Typography variant="h6" color={theme.black}>
										Acessos
									</Typography>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rowsToShow.map((row) => (
								<TableRow key={`${row.year}-${row.month}`}>
									<TableCell align="center" sx={{ paddingLeft: "2rem", fontWeight: "bold" }}>
										{row.year}
									</TableCell>
									<TableCell align="center" sx={{ fontWeight: "bold" }}>
										{row.month}
									</TableCell>
									<TableCell align="center" sx={{ fontWeight: "bold" }}>
										{row.qty}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					{/* Paginação */}
					<TablePagination
						rowsPerPageOptions={[5, 10, 15]}
						component="div"
						count={filteredRows.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
						labelRowsPerPage="Linhas por página"
					/>
				</TableContainer>
			</Box>
		</Box>
	)
}
