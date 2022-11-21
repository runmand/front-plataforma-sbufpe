import { TextField } from '@mui/material';
import { IProps } from './contract';

export default function OpenAnswer(props: IProps) {
	const onAnswer = (answer: string) => {
		props.onAnswerQuestion({ formQuestionFormRegisterId: props.formQuestionFormRegisterId, answer });
	};

	return (
		<TextField
			id='outlined-basic'
			variant='outlined'
			style={{ display: 'flex', backgroundColor: 'wheat', borderRadius: '16px' }}
			onBlur={e => {
				onAnswer(e.target.value);
			}}
		/>
	);
}
