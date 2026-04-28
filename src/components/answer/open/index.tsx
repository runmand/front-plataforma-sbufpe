import { TextField } from '@mui/material';
import { TPROPS } from './type';


export default function Index(props: TPROPS) {
	const handleAnswerQuestion = (answer: string) => {
		props.onAnswerQuestion({ formQuestionFormRegisterId: props.formQuestionFormRegisterId, answer });
	};

	const handleInputValue = (value: string) => {
		handleAnswerQuestion(value);
	};

	return (
		<TextField
			id='outlined-select-curency'
			variant='standard'
			style={{ display: 'flex', borderRadius: '16px' }}
			onChange={e => {
				handleInputValue(e.target.value);
			}}
			onBlur={e => {
				handleInputValue(e.target.value);
			}}
		/>
	);
}
