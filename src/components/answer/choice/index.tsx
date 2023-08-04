import RadioGroup from "@mui/material/RadioGroup";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  Typography,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { CHOICE, TPROPS } from "./type";
import React, { useEffect } from "react";

export default function Index(props: TPROPS) {
  const [answer, setAnswer] = React.useState<number[]>(
    Array(props.choices.length).fill(0)
  );
  const handleSelectChoice = (index: number, choice: CHOICE) => {
    const temp = answer;
    temp.fill(0);
    temp[index] = Number(choice.formsQuestionFormsQuestionChoicesId);
    setAnswer(temp);
    props.onSelectChoice({
      formQuestionFormRegisterId: props.formQuestionFormRegisterId,
      answer: JSON.stringify(answer),
    });
  };

  // Não é a melhor solução, lembrar de ajeitar no backend
  if (props.choices[props.choices.length - 1].title === "Não") {
    const element = props.choices.pop();
    props.choices.unshift(element);
  }

  if (props.choiceType === "select") {
    return (
      <FormControl fullWidth>
        <InputLabel sx={{color:'white','&.Mui-focused':{color:'white'}}} id="demo-simple-select-label">Selecione</InputLabel>
        <Select
	

 sx={{

	color: "white",
	'.MuiOutlinedInput-notchedOutline': {
	  borderColor: '#ffe082',
	},
	'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
	  borderColor: '#ffe082',
	},
	'&:hover .MuiOutlinedInput-notchedOutline': {
	  borderColor: '#ffe082',
	},
	'.MuiSvgIcon-root ': {
	  fill: "white !important",
	},
	'.MuiInputLabel-root':{
		color:'#ffe082'
	},
  }}          labelId="select-label"
          id="select"
          label="Selecione"
        >
          {props.choices.map((choice, index) => (
            <MenuItem
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

  if (props.choiceType === "radio") {
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
                  padding: "4px",
                  color: "#fff",
                  "&.Mui-checked": {
                    color: pink[600],
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: "20px",
                  },
                }}
              />
            }
            label={
              <Typography color={"#fff"} fontSize={"20px"}>
                {choice.title}
              </Typography>
            }
            sx={{
              marginLeft: 0,
              marginRight: 0,
              marginBottom: index === props.choices.length - 1 ? 0 : "8px",
            }}
          />
        ))}
      </RadioGroup>
    );
  }
}
