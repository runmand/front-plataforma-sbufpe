import React, {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import {
  ChoiceAll,
  JustifyChoiceObject,
  QuestionAll,
} from "src/core/typePlaneja";
import { Box, Button, Stack, Typography } from "@mui/material";
import { QuestionResponse } from "./type";
import { ApiPaneja } from "src/core/apiPlaneja";
import { useRouter } from "next/router";

interface sendDataInterface {
  data: QuestionResponse[];
}

const SendData: React.FC<sendDataInterface> = ({ data }) => {
  const [dataSended, setDataSended] = useState<number>(-1);
  const [sended, setSended] = useState<boolean>(false);
  const router = useRouter();

  let dataLength = data.length - 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = new ApiPaneja();
        data.forEach(async (question) => {
          const { idQuestionChoice, idJustifyChoiceByQuestion, response } =
            question;
          const result = await api
            .tempanswerQuestion(idQuestionChoice, idJustifyChoiceByQuestion, {
              response,
            })
            .then((r) => {
              setDataSended((old) => old + 1);
            });
        });
      } catch (error) {
        console.error("Erro ao obter os dados:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (dataSended == dataLength) {
      setSended(true);
    }
  }, [dataSended]);

  return (
    <Box>
      {!sended ? (
        <>
          <div className="loader"></div>
          <Typography
            sx={{
              textAlign: "justify",
            }}
          >
            {dataSended} de {dataLength} pacotes enviados, Por favor aguarde!
          </Typography>
        </>
      ) : (
        <>
          <CheckCircleIcon
            color="success"
            fontSize="large"
            sx={{ width: "50vw", height: "10vh" }}
          />
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "5vh",
              fontWeight: "bolder",
            }}
          >
            Respostas enviados
          </Typography>

          <Stack direction="row">
            <Button
              sx={{ margin: "auto", marginTop: "5vh" }}
              color="success"
              variant="contained"
              onClick={() => {
                router.push("/form");
              }}
            >
              Voltar para pagina inicial
            </Button>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default SendData;
