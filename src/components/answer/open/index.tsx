import { TPROPS } from './type';

export default function Index(props: TPROPS) {
	const isNumeric = props.inputType === 'number';

	const handleAnswerQuestion = (answer: string) => {
		props.onAnswerQuestion({ formQuestionFormRegisterId: props.formQuestionFormRegisterId, answer });
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = isNumeric ? e.target.value.replace(/\D/g, '') : e.target.value;
		handleAnswerQuestion(val);
		if (isNumeric) e.target.value = val;
	};

	return (
		<>
			<style>{`
				.gestbucal-input:-webkit-autofill,
				.gestbucal-input:-webkit-autofill:hover,
				.gestbucal-input:-webkit-autofill:focus {
					-webkit-box-shadow: 0 0 0 1000px #ffffff inset !important;
					box-shadow: 0 0 0 1000px #ffffff inset !important;
					-webkit-text-fill-color: #1c1917 !important;
				}
			`}</style>
			<input
				className="gestbucal-input"
				type="text"
				inputMode={isNumeric ? 'numeric' : 'text'}
				pattern={isNumeric ? '[0-9]*' : undefined}
				placeholder={props.placeholder || 'Digite sua resposta...'}
				onChange={handleChange}
				onBlur={(e) => handleAnswerQuestion(isNumeric ? e.target.value.replace(/\D/g, '') : e.target.value)}
				style={{
					width: '100%',
					padding: '10px 12px',
					fontSize: '15px',
					fontFamily: "'Source Sans 3', -apple-system, sans-serif",
					color: '#1c1917',
					background: '#ffffff',
					border: '1.5px solid #d1d5db',
					borderRadius: '8px',
					outline: 'none',
					boxSizing: 'border-box',
					transition: 'border-color 0.2s, box-shadow 0.2s',
				}}
				onFocus={(e) => {
					e.currentTarget.style.borderColor = '#6D141A';
					e.currentTarget.style.boxShadow = '0 0 0 3px rgba(109,20,26,0.1)';
				}}
				onBlurCapture={(e) => {
					e.currentTarget.style.borderColor = '#d1d5db';
					e.currentTarget.style.boxShadow = 'none';
				}}
			/>
		</>
	);
}
