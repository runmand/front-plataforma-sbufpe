import { Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { ID } from '../../core/types';
import { QuestionAnswer } from '../questions/contract';
import QuestionCard from '../questions/Question';
import { FormState } from './contract';

export default function Form() {
	const [form, setForm] = useState<FormState>({ id: null, title: null, completionMessage: null, questions: [] });
	const [answers, setAnswers] = useState<QuestionAnswer[]>([]);
	const handleAnswerQuestion = (answer: QuestionAnswer) => {
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

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log('clicou em enviar'); //TODO: Implementar envio.
	};

	React.useEffect(() => {
		axios.get(`${process.env.API_URL}/form-registers/formatted/13`).then(res => setForm(res.data.data));
	}, []);

	//TODO: Implementar envio do formulário
	if (form) {
		return (
			<form onSubmit={handleSubmit}>
				<Card style={{ backgroundColor: '#5a0f14' }}>
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
							{form.title}
						</Typography>
						<div>
							{form.questions.map((question, index) => (
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
					{/* <CardActions style={{ justifyContent: 'end', padding: '16px' }}> */}
					{/* <Button type="submit" variant="contained"> */}
					{/* ENVIAR */}
					{/* </Button> */}
					{/* </CardActions> */}
				</Card>
			</form>
		);
	}
}
