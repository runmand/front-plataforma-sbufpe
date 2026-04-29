import { Autocomplete, TextField } from '@mui/material';
import { CHOICE, TPROPS } from './type';
import React from 'react';

const ff = { body: "'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif" };
const C = { primary: '#6D141A', text: '#1c1917', muted: '#78716c', border: '#e7e5e4', bg: '#FAF7F2' };

export default function Index(props: TPROPS) {
	const [answer, setAnswer] = React.useState<number[]>(Array(props.choices.length).fill(0));
	const [selected, setSelected] = React.useState<number | null>(null);

	const handleSelectChoice = (index: number, choice: CHOICE) => {
		const temp = answer.slice();
		temp.fill(0);
		temp[index] = Number(choice.formsQuestionFormsQuestionChoicesId);
		setAnswer(temp);
		setSelected(index);
		props.onSelectChoice({ formQuestionFormRegisterId: props.formQuestionFormRegisterId, answer: JSON.stringify(temp) });
	};

	if (props.choices[props.choices.length - 1].title === 'Não') {
		const element = props.choices.pop();
		props.choices.unshift(element);
	}

	if (props.choiceType === 'autoComplete') {
		const options = props.choices.map((choice) => ({
			label: choice.title,
			id: choice.formsQuestionFormsQuestionChoicesId,
		}));

		return (
			<Autocomplete
				id="combo-box"
				options={options}
				sx={{ width: '100%' }}
				renderInput={(params) => <TextField {...params} label="Selecione" />}
				onChange={(_, choiceEvent: any) => {
					if (!choiceEvent) return;
					const index = props.choices.findIndex((c) => c.formsQuestionFormsQuestionChoicesId == choiceEvent.id);
					handleSelectChoice(index, props.choices[index]);
				}}
			/>
		);
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
			{props.choices.reverse().map((choice, index) => {
				const isSelected = selected === index;
				return (
					<label
						key={index}
						onClick={() => handleSelectChoice(index, choice)}
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '12px',
							padding: '10px 14px',
							borderRadius: '10px',
							border: `1.5px solid ${isSelected ? C.primary : C.border}`,
							backgroundColor: isSelected ? 'rgba(109,20,26,0.04)' : 'transparent',
							cursor: 'pointer',
							transition: 'all 0.2s ease',
						}}
						onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.borderColor = '#a8a29e'; }}
						onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.borderColor = C.border; }}
					>
						{/* Custom radio circle */}
						<div style={{
							width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
							border: `2px solid ${isSelected ? C.primary : '#a8a29e'}`,
							display: 'flex', alignItems: 'center', justifyContent: 'center',
							transition: 'all 0.2s ease',
						}}>
							{isSelected && (
								<div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: C.primary }} />
							)}
						</div>
						<span style={{
							fontFamily: ff.body,
							fontSize: '15px',
							color: isSelected ? C.primary : C.text,
							fontWeight: isSelected ? 600 : 400,
							lineHeight: 1.4,
							transition: 'color 0.2s',
						}}>
							{choice.title}
						</span>
					</label>
				);
			})}
		</div>
	);
}
