import { 
	Card, 
	CardContent, 
	Modal, 
	Typography } from '@mui/material';
import React from 'react';
import { TPROPS } from './type';
import Header from '../../header/index';
import ActionArea from '@components/modal/action-area';
import { theme } from 'src/core/theme';

export default function Index(props: TPROPS) {
	return (
		<Modal
			open={props.isOpen}
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: theme.blur,
				transition: '0.6s',
				
			}}
			onClose={() => {
				if (props.canSkip) props.onClose();
			}}
		>
			<Card 
				sx={{
					backgroundColor: theme.white,
					borderRadius: theme.borderRadiusEdge,
					padding: theme.modal.card.padding,
					minWidth: theme.modal.card.minWidth,
					margin: '10%',
					overflow:'auto',
					maxHeight: '90%'
				}}
			>
				<Header 
					title='Resultado'
					onClose={() => props.onClose()} />
				<CardContent>
					<Typography 
						sx={{ 
							display: 'flex',
							alignItems: 'end',
							marginTop: '1rem',
							fontSize: '1.5rem' }}>
						Pontuação maxíma: &nbsp;
						<Typography 
							sx={{
								fontSize: '1.5rem',
								textTransform: 'uppercase',
								color: theme.secundaryConfirm,
								fontWeight: 'bold',
							}}>
								{props.formResult.maxScore} pts
							</Typography>
					</Typography>

					<Typography 
						sx={{ 
							display: 'flex',
							fontSize: '1.5rem',
							alignItems: 'end',
							marginTop: '1rem',}}>
						Pontuação atingida: &nbsp;
						<Typography 
							sx={{
								fontSize: '1.5rem',
								textTransform: 'uppercase',
								color: theme.secundaryConfirm,
								fontWeight: 'bold',}}>
							{props.formResult.score} pts
						</Typography>
					</Typography>
				</CardContent>
				<Card sx={{
					marginTop: '1rem',
					maxHeight: '16rem',
					maxWidth: '100rem',
					overflow: 'auto'
				}}>
					{props.formResult.domainList.map((domain, index) => (
						<CardContent 
								key={index}>
									
								{/*INSERIR REACT-INTL PARA TRATAR O NOME DO DOMINIO PARA PT-BR 
								<Typography 
									sx={{
										marginTop: '2rem',
										fontSize: '1.8rem',
										textTransform: 'uppercase',
										color: theme.secundaryConfirm,
										fontWeight: 'bold', }}>
									{domain.name}
								</Typography> */}
							{domain.questionList.map((question, key) => (
								<CardContent key={key}>
									<Typography
											sx={{
												color:theme.black,
												fontWeight: 'bold',
												fontSize: '1.5rem' }}>{question.title}		
									</Typography>
									<Typography
										key={key}
										sx={{
											marginBottom: '1rem',
											fontSize: '1.3rem',
											color: theme.grey }}>
												{question.recommendationMessage}
									</Typography>
								</CardContent>
							))}
						</CardContent>
					))}
				</Card>
				<ActionArea isLoading={false} 
				onConfirm={() => props.onClose()} />
			</Card>
		</Modal>
	);
}
