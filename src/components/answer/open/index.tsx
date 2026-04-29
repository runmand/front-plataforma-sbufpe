import { TPROPS } from './type';

export default function Index(props: TPROPS) {
	const handleAnswerQuestion = (answer: string) => {
		props.onAnswerQuestion({ formQuestionFormRegisterId: props.formQuestionFormRegisterId, answer });
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
				onChange={(e) => handleAnswerQuestion(e.target.value)}
				onBlur={(e) => handleAnswerQuestion(e.target.value)}
				style={{
					width: '100%',
					padding: '10px 0',
					fontSize: '15px',
					fontFamily: "'Source Sans 3', -apple-system, sans-serif",
					color: '#1c1917',
					background: 'transparent',
					border: 'none',
					borderBottom: '1.5px solid #e7e5e4',
					outline: 'none',
					boxSizing: 'border-box',
					transition: 'border-color 0.2s',
				}}
				onFocus={(e) => { e.currentTarget.style.borderBottomColor = '#6D141A'; }}
				onBlurCapture={(e) => { e.currentTarget.style.borderBottomColor = '#e7e5e4'; }}
			/>
		</>
	);
}
