import { Card, CardContent, colors, Typography } from '@mui/material';
import React from 'react';
import { QuestionAnswer } from '../../core/types';
import ChoiceAnswer from '../answers/choices/ChoiceAnswer';
import OpenAnswer from '../answers/opens/OpenAnswer';
import { IProps } from './contract';

export default function QuestionCard(props: IProps) {
	const [canShow, setCanShow] = React.useState(false);
	/** 0 - Create variable to store child callback function, for call it on click in a choice's parent. */
	let handleChildCallback: () => void = null;
	/** 1 - Create parent callback function */
	const fromParentCallback = (fromChildCallback: () => void) => (handleChildCallback = fromChildCallback);
	/** 3 - Create child callback function */
	const hideChild = () => {
		setCanShow(true);
	};

	/** 4 - Call parent callback function. */
	props.fromParentCallback?.(hideChild);

	/** 5 - Create on select choice function of this card. */
	const handleMarkChoice = (data: QuestionAnswer) => {
		handleChildCallback?.();
		props.onAnswerQuestion(data);
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
							question={child}
							onAnswerQuestion={handleMarkChoice}
							/** 2 - Create parent callback function */
							fromParentCallback={fromParentCallback}
						/>
					))}
				</div>
			</Card>
		);
	}
}
