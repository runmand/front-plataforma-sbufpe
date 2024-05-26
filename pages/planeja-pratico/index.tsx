import { Box, Button, Typography } from "@mui/material";
import Base from "@components/base-layout/index";
import Appbar from "@components/app-bar/index";
import HomeToolbar from "@components/toolbar/home";
import { useState } from "react";
import { FirstStep } from "@components/planeja-pratico/steps/FirstStep";

export default function Index() {
  const [savedDataToSend, setSavedDataToSend] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState("");
  const data = [];
  const isLastIndex = activeIndex + 1 === data.length;

  function nextQuestion() {
    if (!validateIfCanProcced()) return;

    setActiveIndex(activeIndex + 1);
  }

  function previusQuestion() {
    if (activeIndex === 0) return;
    setActiveIndex(activeIndex - 1);
  }

  function validateIfCanProcced() {
    //validate if all questions are answered

    // if (
    //   !Boolean(savedDataToSend[activeIndex]) ||
    //   !savedDataToSend[activeIndex].justify
    // ) {
    //   setError("Preencha a questão e justificativa antes de continuar");
    //   return false;
    // }

    return true;
  }
  //enviar o formulário
  async function handleSubmit() {}

  return (
    <Base
      appBarChild={<Appbar toolbarChild={<HomeToolbar />} />}
      mainContainerChild={
        <Box
          component={"form"}
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            marginY: "6rem",
            display: "flex",
            marginX: "auto",
            flexDirection: "column",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
            paddingY: "50px",
            paddingX: "40px",
          }}
        >
          <Box
            width={"100%"}
            height={"100%"}
            my={4}
            display="flex"
            flexDirection={"column"}
            gap={4}
            color={"black"}
          >
            <FirstStep />

            <Box
              display="flex"
              alignItems="center"
              justifyContent={"flex-end"}
              gap={4}
            >
              <Button
                onClick={nextQuestion}
                variant="contained"
                color="primary"
                type={isLastIndex ? "submit" : "button"}
              >
                {isLastIndex ? "Finalizar" : "Próxima"}
              </Button>
            </Box>
          </Box>
        </Box>
      }
    />
  );
}
