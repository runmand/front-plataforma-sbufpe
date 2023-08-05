import RadioGroup from '@mui/material/RadioGroup';
import { FormControl, FormControlLabel, InputLabel, MenuItem, Radio, Select, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';
import { CHOICE, TPROPS } from './type';
import React, { useEffect } from 'react';
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

	if (props.choiceType === "select") {
		return (
		  <FormControl fullWidth>
			<InputLabel sx={{color:'white','&.Mui-focused':{color:'#6d141a'}}} id="demo-simple-select-label">Selecione</InputLabel>
			<Select
		
	
	 sx={{
	
		color: "#6d141a",
		'.MuiOutlinedInput-notchedOutline': {
		  borderColor: '#6d141a',
		},
		'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
		  borderColor: '#6d141a',
		},
		'&:hover .MuiOutlinedInput-notchedOutline': {
		  borderColor: '#6d141a',
		},
		'.MuiSvgIcon-root ': {
		  fill: "white !important",
		},
		'.MuiInputLabel-root':{
			color:'#6d141a'
		},
	  }}          labelId="select-label"
			  id="select"
			  label="Selecione"
			>
			  {props.choices.map((choice, index) => (
				<MenuItem
				key={index}
				  onClick={() => {
					handleSelectChoice(index, choice);
				  }}
				  value={choice.title}
				>
				  {choice.title}
				</MenuItem>
			  ))}
			</Select>
		  </FormControl>
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
