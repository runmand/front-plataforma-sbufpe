import { Card, CardContent, colors, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { emitterEnum } from '../../core/enums';
import { emitter } from '../../core/events';
import ChoiceAnswer from '../answers/choices/ChoiceAnswer';
import OpenAnswer from '../answers/opens/OpenAnswer';
import { IProps, QuestionAnswer } from './contract';

export default function QuestionCard(props: IProps) {
	const [canShow, setCanShow] = React.useState(false);

	useEffect(() => {
		if (props.parent) {
			const canShowQuestionEventKey = `${props.parent.formQuestionFormRegisterId}-${emitterEnum.CAN_SHOW_QUESTION}`;
			/** Criando evento de escuta no filho. */
			const listener = emitter.on(canShowQuestionEventKey, (answer: QuestionAnswer) =>
				setCanShow(answer.answer.replace(/[1-9]\d*/g, '1') === JSON.stringify(props.question.condition?.userAnswer))
			);

			return () => {
				listener.removeListener(canShowQuestionEventKey, e => console.log(e));
			};
		}
	}, [props.parent, props.question.condition?.userAnswer]);

	/** Criando evento de emissão no pai. */
	const handleMarkChoice = (answer: QuestionAnswer) => {
		emitter.emit(`${props.question.formQuestionFormRegisterId}-${emitterEnum.CAN_SHOW_QUESTION}`, answer);
		props.onAnswerQuestion(answer);
	};

	if (!props.isChild || canShow) {
		return (
			<Card
				style={{
					margin: !props.isChild ? '0px 0px 24px 0px' : '0px 24px 24px 24px',
					backgroundColor: !props.isChild ? '#6D141A' : '#5C0309',
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
							onAnswerQuestion={handleMarkChoice}
						/>
					) : (
						<ChoiceAnswer
							formQuestionFormRegisterId={props.question.formQuestionFormRegisterId}
							choices={props.question.choices}
							onAnswerQuestion={handleMarkChoice}
						/>
					)}
				</CardContent>
				<div>
					{props.question.childrenQuestion.map((child, index) => (
						<QuestionCard
							key={index}
							index={index}
							isChild={true}
							parent={props.question}
							question={child}
							onAnswerQuestion={handleMarkChoice}
						/>
					))}
				</div>
			</Card>
		);
	}
}
