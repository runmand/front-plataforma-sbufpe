import { Card, CardContent, colors, Typography } from '@mui/material';
import ChoiceAnswer from '../answers/ChoiceAnswer';
import { IProps } from './contract';

export default function QuestionCard(props: IProps) {
	return (
		<div>
			{(props.questions || []).map((question, index) => (
				<Card
					key={index}
					style={{ marginBottom: '24px', backgroundColor: '#6D141A', borderRadius: '16px' }}
				>
					<CardContent style={{ padding: '16px' }}>
						<Typography style={{ marginBottom: '16px', fontSize: '24px', color: colors.amber[200] }}>
							{index} - {question.title}
						</Typography>
						<ChoiceAnswer
							choices={question.choices}
							onChange={props.handleChange}
						/>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
