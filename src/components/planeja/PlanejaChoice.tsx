import React, { useEffect } from "react";
import {
  ChoiceAll,
  JustifyChoiceObject,
  QuestionAll,
} from "src/core/typePlaneja";
import {
  Box,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

import { theme } from "src/core/theme";
import { useState } from "react";
import { QuestionResponse } from "./type";

interface PlanejaChoiceProps {
  question: QuestionAll;
  onDataUpdate: (data: QuestionResponse[], response: string) => void;
  size: string;
}

const PlanejaChoice: React.FC<PlanejaChoiceProps> = ({
  question,
  onDataUpdate,
  size,
}) => {
  const [textInput, setTextInput] = useState<JustifyChoiceObject[]>([]);
  const [textFieldVisible, setTextFieldVisible] = useState([]);
  const [data, setData] = useState<QuestionResponse[]>([]);
  const [sizeChoice, setSizeChoice] = useState<number[]>([]);
  let index = 0;
  const [text, setText] = useState<string[]>();

  function respondChoice(choice: ChoiceAll, indexMap: number) {
    if (choice.JustifyChoice == null) {
      const newData: QuestionResponse = {
        idQuestion: question.question.id,
        idQuestionChoice: choice.choice.idQuestionChoice,
        idJustifyChoiceByQuestion: -1,
        response: "",
      };

      setData((prev) => {
        const updatedData = [...prev];
        updatedData[indexMap];
        return updatedData;
      });
      const newTextFieldVisible = [...textFieldVisible];
      newTextFieldVisible[indexMap] = false;
      setTextFieldVisible(newTextFieldVisible);
    } else {
      const newData: QuestionResponse = {
        idQuestion: question.question.id,
        idQuestionChoice: choice.choice.idQuestionChoice,
        idJustifyChoiceByQuestion:
          choice.JustifyChoice.idJustifyChoiceByQuestion,
        response: "",
      };
      setData((prev) => {
        const updatedData = [...prev];
        updatedData[indexMap] = newData;
        return updatedData;
      });

      const newTextInput = [...textInput];
      newTextInput[indexMap] = choice.JustifyChoice;
      setTextInput(newTextInput);

      const newTextFieldVisible = [...textFieldVisible];
      newTextFieldVisible[indexMap] = true;
      setTextFieldVisible(newTextFieldVisible);
    }
  }

  function updateData(response: string, indexMap: number) {
    setData((prev) => {
      const updatedData = [...prev];
      updatedData[indexMap].response = response;
      return updatedData;
    });

    onDataUpdate(data, response);
  }

  useEffect(() => {
    setText(question.question.title.split("**"));
    const loader = size
      .split(",")
      .map((item) => {
        const number = Number(item);
        if (!isNaN(number)) {
          return number;
        }
      })
      .filter(Boolean);
    setSizeChoice(loader);
  }, []);

  function getChoices(line: number, choices: ChoiceAll[]): ChoiceAll[] {
    const actualChoices: ChoiceAll[] = [];

    for (let i = 0; i < line; i++) {
      actualChoices.push(choices[index]);
      index++;
    }
    return actualChoices;
  }

  const sizeChoiceElements = sizeChoice.map((line, indexMap) => (
    <Box
      key={indexMap}
      sx={{
        padding: "1rem",
        width: "100%",
        borderRadius: theme.borderRadiusSmooth,
      }}
    >
      <FormLabel component="legend" sx={{ fontSize: "1.3rem", color: "black" }}>
        {text[indexMap]}
      </FormLabel>
      <RadioGroup id={question.question.id.toString()} aria-required="true">
        {getChoices(line, question.choices).map((choice) => (
          <FormControlLabel
            onClick={(e) => respondChoice(choice, indexMap)}
            value={choice.choice.idQuestionChoice}
            key={choice.choice.idQuestionChoice}
            control={<Radio />}
            label={
              <Typography fontWeight="bold" color={"black"}>
                {choice.choice.title}
              </Typography>
            }
          />
        ))}
      </RadioGroup>
      {textFieldVisible[indexMap] && (
        <FormLabel
          component="legend"
          sx={{ fontSize: "1.2rem", color: "black" }}
        >
          {textInput[indexMap].title}
          <TextField
            required
            fullWidth
            multiline
            rows={4}
            value={data[indexMap].response}
            onChange={(e) => {
              updateData(e.target.value, indexMap);
            }}
            sx={{ backgroundColor: theme.white }}
          />
        </FormLabel>
      )}
    </Box>
  ));

  return <>{sizeChoiceElements}</>;
};

export default PlanejaChoice;
