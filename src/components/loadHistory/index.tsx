import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Update, Info } from '@mui/icons-material';

interface Props {
  thisPrincipal: boolean;
  updateForm: () => void;
  useThis: () => void;
}

const LoadHistory: React.FC<Props> = ({ thisPrincipal, updateForm, useThis }) => {
  return (
    <>
      {thisPrincipal === false ? (
        <Typography sx={{ color: "ButtonFace" }} textAlign={"center"} variant="subtitle1">
          Você tem um formulário em aberto, clique no botão &quot;atualizar&quot; para abri-lo novamente.
          <Box></Box>
          <Button
            onClick={updateForm}
            variant="contained"
            color="primary"
            type={"button"}
            style={{ marginRight: "2%" }}
          >
            <Update /> Atualizar
          </Button>
          <Button
            onClick={useThis}
            variant="contained"
            color="warning"
            type={"button"}
          >
            <Info /> Utilizar formulário atual
          </Button>
        </Typography>
      ) : (
        <></>
      )}
    </>
  );
};

export default LoadHistory;