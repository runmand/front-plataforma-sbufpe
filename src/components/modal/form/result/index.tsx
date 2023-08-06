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
// import { ResultFormPdf } from '@components/FormResultPdf';
// const PdfComponent = React.lazy(() => import('@components/FormResultPdf'));
// import { pdf } from '@react-pdf/renderer';


export default function Index(props: TPROPS) {
	
	async function downloadPdf(){
		// const blob = await pdf(
		// 	<PdfComponent
		// 	domainList={props.formResult.domainList}
		// maxScore={props.formResult.maxScore}
		// score={props.formResult.score}	
		// 	/>
		//   ).toBlob();
	
		//   // Create a URL for the blob object
		//   const url = URL.createObjectURL(blob);
		//   // Create an anchor element and set its href to the PDF URL
		//   const a = document.createElement("a");
		//   a.href = url;
	
		//   // Set the anchor element's download attribute to the PDF file name
		//   a.download = new Date()+"";
	
		//   // Append the anchor element to the document body
		//   document.body.appendChild(a);
	
		//   // Click the anchor element to initiate the download
		//   a.click();
	
		//   // Remove the anchor element from the document body
		//   document.body.removeChild(a);
	}

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
						Pontuação Máxima: &nbsp;
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
								<Typography 
									sx={{
										marginTop: '2rem',
										fontSize: '1.8rem',
										textTransform: 'uppercase',
										color: theme.secundaryConfirm,
										fontWeight: 'bold', }}>
									{domain.name}
								</Typography>
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
				isPdfDownloadable={props.formId !== 2}
				onClickDownload={() => downloadPdf()}
				onConfirm={() => props.onClose()} />
			</Card>
		</Modal>
	);
}
