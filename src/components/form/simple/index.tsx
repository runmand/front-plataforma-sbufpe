import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ID } from '../../../core/types';
import { QUESTION, QUESTION_ANSWER } from '../../question/type';
import QuestionCard from '../../question';
import SendIcon from '@mui/icons-material/Send';
import Alert from '@components/alert/index';
import { useSnackbar } from 'notistack';
import { TPROPS } from './type';
import SimpleFormService from './service';
import { theme } from 'src/core/theme';
import useMediaQuery from '@mui/material/useMediaQuery';

//TODO: Corrigir problema de F5
export default function Index(props: TPROPS) {
	const [answers, setAnswers] = useState<QUESTION_ANSWER[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [isOpenSubmitFormDialog, setIsOpenSubmitFormDialog] = useState<boolean>(false);
	const { enqueueSnackbar } = useSnackbar();
	const simpleFormService = new SimpleFormService();
	const smQuery =useMediaQuery('(max-width:520px)');

	const handleAnswerQuestion = (answer: QUESTION_ANSWER) => {
		const temp = answers;
		const indexToUpdate = temp.findIndex(item => item.formQuestionFormRegisterId === answer.formQuestionFormRegisterId);
		if (indexToUpdate >= 0) temp[indexToUpdate] = answer;
		else temp.push(answer);
		

		setAnswers(temp);
	};

	const handleHideQuestion = (formQuestionFormRegisterId: ID) => {
		const temp = answers;
		const indexToRemove = temp.findIndex(item => item.formQuestionFormRegisterId === formQuestionFormRegisterId);

		if (indexToRemove >= 0) {
			temp.splice(indexToRemove, 1);
			setAnswers(temp);
		}
	};

	const handleOpenSubmitFormDialog = () => {
		if (answers.length >= props.formattedForm.questions.length){
			setIsOpenSubmitFormDialog(true);
		} else {
			// setFailedState(true);
			scrollTo(0,0);
			alert("Formulário não foi preenchido por inteiro.\n\nPara enviar o formulário é necessário responder todas as perguntas apresentadas. Feche esse diálogo para voltar e responder o que falta.")
		}
	};
	const handleCloseSubmitFormDialog = () => setIsOpenSubmitFormDialog(false);

	const formatted = (array: QUESTION[]) =>{
		if (props.formattedForm.id == 2){			
			//Formatação baseado em uma questão especifica do form 2
			return [
				...array.slice(0, 4),
				...array.splice(array.length-1, array.length),
				...array.splice(4, array.length-1),
			]
		}else{
			return array;
		}
		

		

	}


	const handleSubmit = () => {
		setLoading(true);

		simpleFormService
			.handleSubmit(answers)
			.then(res => {
				if (!res.errors) {
					//TODO: Implementar travas do questionario.
					enqueueSnackbar('Formulário enviado com sucesso!', { variant: 'success' });
					handleCloseSubmitFormDialog();
					props.onFinish();
				} else {
					res.errors.forEach(error => enqueueSnackbar(error, { variant: 'error' }));
				}
			})
			.catch(e => {
				console.error(e);
				enqueueSnackbar('Ops! Algo deu errado...', { variant: 'error' }); //TODO: Tratar essa exception
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<>
			<Card 
				sx={{
					backgroundColor: theme.greyLight,
					padding:'0% 5% 3% 5%',
					

				}}
			>
				<CardContent>
					<Typography
						sx={{
							borderRadius: '16px',
							textAlign: 'center',
							color: theme.blur,
							fontSize: !smQuery ? '4vw': '4vw',
							fontWeight: 'bold',
							marginBottom: '16px',
							padding: '16px'
						}}
					>
						{props.formattedForm.title}
					</Typography>
					<>
						{formatted(props.formattedForm.questions.sort((a, b) => +a.formQuestionFormRegisterId - +b.formQuestionFormRegisterId)).map((question, index) => (
							<QuestionCard
								key={index}
								index={index}
								question={question}
								onAnswerQuestion={data => {
									
									handleAnswerQuestion(data);
								}}
								onHideQuestion={data => {
									handleHideQuestion(data);
								}}
							/>
						))}
					</>
				</CardContent>

				<CardActions 
				sx={{ 
					justifyContent: 'end',
					padding: '16px'
					}}>
					<Button 
					variant='contained'
					endIcon={<SendIcon />}
					onClick={() => handleOpenSubmitFormDialog()}>
						ENVIAR
					</Button>
				</CardActions>
			</Card>

			<Alert
				title='Confirmar envio do formulário?'
				msg='Atenção! Ao enviar o formulário suas respostas antigas serão sobreescritas! Esta ação não poderá ser desfeita neste momento!'
				isOpen={isOpenSubmitFormDialog}
				isLoading={loading}
				canSkip={false}
				onClose={() => handleCloseSubmitFormDialog()}
				onConfirm={() => handleSubmit()}
			/>
			{
			// TODO: Usar <Alert/> ao invés de alert()
			/* <Alert
				title='Formulário não foi preenchido por inteiro.'
				msg='Atenção! Para enviar o formulário é necessário responder todas as perguntas apresentadas. Feche esse diálogo para voltar e responder o que falta.'
				isOpen={failedToAnswer}
				isLoading={loading}
				canSkip={true}
				onClose={() => handleCloseFailDialog()}
				// onConfirm={() => true}
			/> */}
		</>
	);
}
