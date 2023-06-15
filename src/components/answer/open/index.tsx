import { TextField } from '@mui/material';
import { TPROPS } from './type';


export default function Index(props: TPROPS) {
	const handleAnswerQuestion = (answer: string) => {
		props.onAnswerQuestion({ formQuestionFormRegisterId: props.formQuestionFormRegisterId, answer });
	};

	return (
		<TextField
			id='outlined-select-curency'
			variant='standard'
			style={{ display: 'flex', borderRadius: '16px' }}
			onBlur={e => {
				handleAnswerQuestion(e.target.value);
			}}
		/>
	);
}
