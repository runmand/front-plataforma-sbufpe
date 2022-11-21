import { Card, CardContent, colors, Typography } from '@mui/material';
import React from 'react';
import { emitterEnum } from '../../core/enums';
import { emitter } from '../../core/events';
import ChoiceAnswer from '../answers/choices/ChoiceAnswer';
import OpenAnswer from '../answers/opens/OpenAnswer';
import { IProps, QuestionAnswer } from './contract';

export default function QuestionCard(props: IProps) {
	const [canShow, setCanShow] = React.useState(false);

	/** Criando evento de emissão em todas as questões. */
	const handleAnswerQuestion = (answer: QuestionAnswer) => {
		const emitterKey = `${props.question.formQuestionFormRegisterId}-${emitterEnum.CAN_SHOW_QUESTION}`;
		emitter.emit(emitterKey, answer);
	};

	if (props.parent) {
		const listenerKey = `${props.parent.formQuestionFormRegisterId}-${emitterEnum.CAN_SHOW_QUESTION}`;

		/** Criando evento de escuta no filho. */
		emitter.addListener(listenerKey, (parentAnswer: QuestionAnswer) => {
			const isSameAnswer = parentAnswer.answer.replace(/[1-9]\d*/g, '1') === JSON.stringify(props.question.condition?.userAnswer);
			setCanShow(isSameAnswer);

			return () => {
				listener.removeListener(canShowQuestionEventKey, e => console.log(e));
			};
		}
		});
	}

	if (!props.parent || canShow) {
		return (
			<Card
				style={{
					margin: !props.parent ? '0px 0px 24px 0px' : '0px 24px 24px 24px',
					backgroundColor: !props.parent ? '#6D141A' : '#5C0309',
					borderRadius: '16px',
				}}
			>
				<CardContent style={{ padding: '16px' }}>
					<Typography style={{ marginBottom: '16px', fontSize: '24px', color: colors.amber[200] }}>
						{props.index} - {props.question.title}
					</Typography>
					{props.question.choices.length === 0 ? (
						<OpenAnswer
							formQuestionFormRegisterId={props.question.formQuestionFormRegisterId}
							onAnswerQuestion={data => {
								handleAnswerQuestion(data);
							}}
						/>
					) : (
						<ChoiceAnswer
							formQuestionFormRegisterId={props.question.formQuestionFormRegisterId}
							choices={props.question.choices}
							onSelectChoice={data => {
								handleAnswerQuestion(data);
							}}
						/>
					)}
				</CardContent>
				<div>
					{props.question.childrenQuestion.map((child, index) => (
						<QuestionCard
							key={index}
							index={index}
							parent={props.question}
							question={child}
							answers={props.answers}
						/>
					))}
				</div>
			</Card>
		);
	}
}
