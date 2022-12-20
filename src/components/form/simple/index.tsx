import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ID } from '../../../core/types';
import { QUESTION_ANSWER } from '../../question/type';
import QuestionCard from '../../question';
import SendIcon from '@mui/icons-material/Send';
import AlertDialog from '../../dialogs/alerts/AlertDialog';
import { useSnackbar } from 'notistack';
import { TPROPS } from './type';
import SimpleFormService from './service';
import router from 'next/router';
import { routerEnum } from 'src/core/enums';

//TODO: Corrigir problema de F5
export default function Index(props: TPROPS) {
	const [answers, setAnswers] = useState<QUESTION_ANSWER[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
	const { enqueueSnackbar } = useSnackbar();
	const simpleFormService = new SimpleFormService();

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

	const handleOpenDialog = () => setIsOpenDialog(true);

	const handleCloseDialog = () => setIsOpenDialog(false);

	const handleSubmit = () => {
		setLoading(true);

		simpleFormService
			.handleSubmit(answers)
			.then(res => {
				if (!res.errors) {
					//TODO: Implementar travas do questionario.
					enqueueSnackbar('Formulário enviado com sucesso!', { variant: 'success' });
					handleCloseDialog();
					router.push(routerEnum.FORM);
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
		<div>
			<Card style={{ backgroundColor: '#5a0f14', padding: '2% 15% 10% 15%' }}>
				<CardContent>
					<Typography
						style={{
							backgroundColor: '#777',
							borderRadius: '16px',
							textAlign: 'center',
							color: '#000',
							fontSize: '48px',
							fontWeight: 'bold',
							marginBottom: '16px',
							padding: '16px',
						}}
					>
						{props.formattedForm.title}
					</Typography>
					<div>
						{props.formattedForm.questions.map((question, index) => (
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
					</div>
				</CardContent>

				<CardActions style={{ justifyContent: 'end', padding: '16px' }}>
					<Button
						variant='contained'
						endIcon={<SendIcon />}
						onClick={() => {
							handleOpenDialog();
						}}
					>
						ENVIAR
					</Button>
				</CardActions>
			</Card>

			<AlertDialog
				title='Confirmar envio do formulário?'
				msg='Atenção! Essa ação não poderá ser desfeita neste momento.'
				isOpen={isOpenDialog}
				isLoading={loading}
				canSkip={false}
				onClose={() => {
					handleCloseDialog();
				}}
				onConfirm={() => {
					handleSubmit();
				}}
			/>
		</div>
	);
}
