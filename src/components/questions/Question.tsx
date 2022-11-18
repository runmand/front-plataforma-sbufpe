import { Card, CardContent, colors, Typography } from '@mui/material';
import ChoiceAnswer from '../answers/choices/ChoiceAnswer';
import OpenAnswer from '../answers/opens/OpenAnswer';
import { IProps } from './contract';

export default function QuestionCard(props: IProps) {
	return (
		<div>
			{(props.questions || []).map((question, index) => {
					return (
						<div key={index}>
							<Card
								style={{
									margin: !props.isChild ? '0px 0px 24px 0px' : '0px 24px 24px 24px',
									backgroundColor: !props.isChild ? '#6D141A' : '#5C0309',
									borderRadius: '16px',
								}}
							>
								<CardContent style={{ padding: '16px' }}>
									<Typography style={{ marginBottom: '16px', fontSize: '24px', color: colors.amber[200] }}>
										{index} - {question.title}
									</Typography>
									{question.choices.length === 0 ? (
										<OpenAnswer
											formQuestionFormRegisterId={question.formQuestionFormRegisterId}
											onAnswerQuestion={props.onAnswerQuestion}
										/>
									) : (
										<ChoiceAnswer
											formQuestionFormRegisterId={question.formQuestionFormRegisterId}
											choices={question.choices}
											onAnswerQuestion={props.onAnswerQuestion}
										/>
									)}
								</CardContent>

								<QuestionCard
									isChild={true}
									questions={question.childrenQuestion}
									onAnswerQuestion={props.onAnswerQuestion}
								/>
							</Card>
						</div>
					);
				}
			})}
		</div>
	);
}
