import { TextField } from '@mui/material';
import { TPROPS } from './type';

export default function Index(props: TPROPS) {
	const handleAnswerQuestion = (answer: string) => {
		props.onAnswerQuestion({ formQuestionFormRegisterId: props.formQuestionFormRegisterId, answer });
	};

	return (
		<TextField
			id='outlined-basic'
			variant='outlined'
			style={{ display: 'flex', backgroundColor: 'wheat', borderRadius: '16px' }}
			onBlur={e => {
				handleAnswerQuestion(e.target.value);
			}}
		/>
	);
}
