import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Save } from '@mui/icons-material'; // Faltou importar o ícone Save

interface Props {
  dataSaved: boolean;
  saveData: () => void;
}

const SaveButton: React.FC<Props> = ({ dataSaved, saveData }) => {
  return (
    <>
      {dataSaved === false ? (
        <Button onClick={saveData} variant="outlined">
          <Save /> Salvar Dados
        </Button>
      ) : (
        <Button onClick={saveData} variant="outlined" color="primary" disabled>
          <Save /> Dados salvos
        </Button>
      )}
    </>
  );
};

export default SaveButton;
