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

interface TextPlanejaProps {
  line: string;
}

const TextPlaneja: React.FC<TextPlanejaProps> = ({ line }) => {
  const createMarkup = (content: string) => ({ __html: content });

  // Verifica se a linha contém uma tabela
  const containsTable = line.includes("<table>");

  if (containsTable) {
    return (
      <div
        className="table-container"
        dangerouslySetInnerHTML={createMarkup(line)}
      />
    );
  } else {
    return (
      <Typography
        sx={{
          textAlign: "justify",
        }}
        dangerouslySetInnerHTML={createMarkup(line)}
      />
    );
  }
};

export default TextPlaneja;
