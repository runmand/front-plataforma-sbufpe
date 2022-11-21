import RadioGroup from '@mui/material/RadioGroup';
import { FormControlLabel, Radio, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';
import { Choice, IProps } from './contract';
import React from 'react';

export default function ChoiceAnswer(props: IProps) {
	const [answer, setAnswer] = React.useState<number[]>(Array(props.choices.length).fill(0));
	const onSelectChoice = (index: number, choice: Choice) => {
		const temp = answer;
		temp.fill(0);
		temp[index] = Number(choice.formsQuestionFormsQuestionChoicesId);
		setAnswer(temp);
		props.onAnswerQuestion({ formQuestionFormRegisterId: props.formQuestionFormRegisterId, answer: JSON.stringify(answer) });
	};

	return (
		<RadioGroup>
			{props.choices.map((choice, index) => (
				<FormControlLabel
					key={index}
					value={index}
					control={
						<Radio
							onChange={() => {
								onSelectChoice(index, choice);
							}}
							sx={{
								padding: '4px',
								color: '#fff',
								'&.Mui-checked': {
									color: pink[600],
								},
								'& .MuiSvgIcon-root': {
									fontSize: '20px',
								},
							}}
						/>
					}
					label={
						<Typography
							color={'#fff'}
							fontSize={'20px'}
						>
							{choice.title}
						</Typography>
					}
					sx={{ marginLeft: 0, marginRight: 0, marginBottom: index === props.choices.length - 1 ? 0 : '8px' }}
				/>
			))}
		</RadioGroup>
	);
}
