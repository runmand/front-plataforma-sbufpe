import React, { ChangeEvent, MouseEventHandler, useEffect } from "react";
import {
  ChoiceAll,
  JustifyChoiceObject,
  QuestionAll,
} from "src/core/typePlaneja";
import {
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { theme } from "src/core/theme";
import { useState } from "react";
import { QuestionResponse } from "./type";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { extractHeader, extractTextBetweenTags } from "./service";
import TextPlaneja from "./TextPlanejaProps";
import PlanejaChoice from "./PlanejaChoice";

interface PlanejaProps {
  question: QuestionAll;
  hidden: boolean;
  nextPage: (data: QuestionResponse[]) => void;
  previusPage: () => void;
}

const PlanejaQuestion: React.FC<PlanejaProps> = ({
  question,
  hidden,
  nextPage,
  previusPage,
}) => {
  const [data, setData] = useState<QuestionResponse[]>([]);
  const [text, setText] = useState([1, 2, 3, 4]);
  function next() {
    const haveQuestion: boolean = question.choices.length > 0;

    if (haveQuestion) {
      let errors: boolean = false;
      if (data.length == 0) errors = true;
      data.forEach((dataLoad) => {
        if (dataLoad) {
          if (dataLoad.response.split("").length == 0) {
            errors = true;
          }
          return;
        }

        if (dataLoad == undefined) {
          errors = true;
          return;
        }
      });

      if (errors) {
        alert("Preencha todas as perguntas");

        return;
      }
      nextPage(data);
    } else {
      nextPage(null);
    }
  }

  function previus() {
    previusPage();
  }

  function handleDataUpdate(newData: QuestionResponse[], response: string) {
    setData(newData);
  }

  return (
    <Box style={{ display: hidden ? "none" : "block" }}>
      <Typography
        sx={{
          margin: "auto",
          paddingBottom: "2rem",
          fontWeight: "bold",
        }}
      >
        {extractHeader(question.question.text)}
      </Typography>

      {text.map((line, index) => (
        <React.Fragment key={`line_${index}`}>
          {/* Mapeamento para parâmetro 't' = text */}
          {extractTextBetweenTags(
            question.question.text,
            `_t${line}_`,
            `_t${line}_`
          )?.map((line, index) => (
            <TextPlaneja key={`t${line}_${index}`} line={line}></TextPlaneja>
          ))}

          {/* Mapeamento para parâmetro 'q' = question */}
          {extractTextBetweenTags(
            question.question.text,
            `_q${line}_`,
            `_q${line}_`
          )?.map((line, index) => (
            <PlanejaChoice
              key={`q${line}_${index}`}
              question={question}
              onDataUpdate={handleDataUpdate}
              size={line}
            ></PlanejaChoice>
          ))}
        </React.Fragment>
      ))}

      <Stack direction="row">
        <Button
          onClick={previus}
          color="error"
          variant="contained"
          startIcon={<ArrowBackIcon />}
        >
          Voltar
        </Button>
        <Button
          color="success"
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={next}
        >
          Continuar
        </Button>
      </Stack>
    </Box>
  );
};

export default PlanejaQuestion;
