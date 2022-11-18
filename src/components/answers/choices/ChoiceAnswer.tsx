import RadioGroup from '@mui/material/RadioGroup';
import { FormControlLabel, Radio, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';
import { IProps } from './contract';

export default function ChoiceAnswer(props: IProps) {
	const answer: number[] = Array(props.choices.length).fill(0);

	return (
		<RadioGroup>
			{props.choices.map((choice, index) => (
				<FormControlLabel
					key={index}
					value={index}
					control={
						<Radio
							onChange={e => {
								answer.fill(0);
								answer[index] = Number(choice.formsQuestionFormsQuestionChoicesId);
								return props.onAnswerQuestion(e, { formQuestionFormRegisterId: props.formQuestionFormRegisterId, answer: JSON.stringify(answer) });
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
