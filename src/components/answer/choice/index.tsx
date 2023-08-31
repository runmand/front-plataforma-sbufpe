import RadioGroup from '@mui/material/RadioGroup';
import { 
Autocomplete,
FormControlLabel,
Radio,
TextField,
Typography
} from '@mui/material';
import { pink } from '@mui/material/colors';
import { CHOICE, TPROPS } from './type';
import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Index(props: TPROPS) {
	const [answer, setAnswer] = React.useState<number[]>(Array(props.choices.length).fill(0));
	const smQuery = useMediaQuery('(min-width:500px)');

	const handleSelectChoice = (index: number, choice: CHOICE) => {
		const temp = answer;
		temp.fill(0);
		temp[index] = Number(choice.formsQuestionFormsQuestionChoicesId);
		setAnswer(temp);
		props.onSelectChoice({ formQuestionFormRegisterId: props.formQuestionFormRegisterId, answer: JSON.stringify(answer) });
	};

	// Não é a melhor solução, lembrar de ajeitar no backend
	if (props.choices[props.choices.length - 1].title === 'Não') {
			const element = props.choices.pop()
			props.choices.unshift(element)
	}

	if (props.choiceType === "autoComplete") {
		const optionsAutoComplete:any = props.choices.map((choice)=> {
			return{
				label: choice.title,
				id: choice.formsQuestionFormsQuestionChoicesId
			}
		})

		return (
			<Autocomplete
      id="combo-box-demo"
      options={optionsAutoComplete}
      sx={{ width: 1}}
      renderInput={(params) => <TextField {...params} label="Selecione" />}
			onChange={(event,choiceEvent:any) => {
				const index = props.choices.findIndex((indexChoice)=>{
					return indexChoice.formsQuestionFormsQuestionChoicesId == choiceEvent.id
				})
				const choice = props.choices[index]
				handleSelectChoice(index, choice);
			}}
    />
		);
	}
	return (
		<RadioGroup>
			{props.choices.reverse().map((choice, index) => (
				<FormControlLabel
					key={index}
					value={index}
					control={
						<Radio
							onChange={() => {
								handleSelectChoice(index, choice);
							}}
							sx={{
								padding: '4px',
								color: 'black',
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
							color={'black'}
							fontSize={!smQuery ? '4vw' : '2vw'}
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