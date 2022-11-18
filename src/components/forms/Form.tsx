import { Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { ID } from '../../core/types';
import QuestionCard from '../questions/Question';
import { FormState } from './contract';

export default function Form() {
	const [form, setForm] = React.useState<FormState>({ id: null, title: null, completionMessage: null, questions: [] });
	const handleAnswerQuestion = (value: { formQuestionFormRegisterId: ID; answer: string }) => console.log(value); //TODO: Implementar evento de troca.
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
						<QuestionCard
							questions={form.questions}
							onAnswerQuestion={handleAnswerQuestion}
						/>
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
