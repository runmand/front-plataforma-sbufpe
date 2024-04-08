import React, { ChangeEvent, MouseEventHandler, useEffect } from "react";
import {
  ChoiceAll,
  JustifyChoiceObject,
  QuestionAll,
} from "src/core/typePlaneja";
import { Box, Typography } from "@mui/material";
import { QuestionResponse } from "./type";

interface sendDataInterface {
  data: QuestionResponse[];
}

const SendData: React.FC<sendDataInterface> = ({ data }) => {
  let dataLength = 9;
  let dataSended = 1;

  return (
    <Box>
      <div className="loader"></div>
      <Typography
        sx={{
          textAlign: "justify",
        }}
      >
        {dataSended} de {dataLength} pacotes enviados, Por favor aguarde!
      </Typography>
    </Box>
  );
};

export default SendData;
