import { Box, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import { theme } from "src/core/theme";
import { PlanejaProps } from "./type";
import { useState } from "react";

export const PlanejaQuest = (
  { id = '',
  title = '', 
  respondido = '', 
  description = '', 
  yesDescr = '', 
  noDescr = '', 
  noHasJustify = true,
  campoMensagem, 
}: PlanejaProps) => {
  const retorno = (value: string) => {
    respondido = value;
  }
  const [justify, setJustify] = useState('');
  
  if (respondido === 'Sim') {
    {yesDescr = description}
  } else if (respondido === 'Não') {
    {noDescr = description}
  }

  if (noHasJustify === true && respondido === '') {
    campoMensagem = <TextField required fullWidth multiline rows={4} onChange={(e) => setJustify(e.target.value)} value={justify + id} sx={{ backgroundColor: theme.white }} label="1." />;
  } else if (respondido != 'Não') {
    campoMensagem = <TextField required fullWidth multiline rows={4} onChange={(e) => setJustify(e.target.value)} value={justify + id} sx={{ backgroundColor: theme.white }} label="1." />;
  }

  return (
    <Box
      sx={{
        padding: '1rem',
        width: '100%',
        borderRadius: theme.borderRadiusSmooth,
      }}
    >
      <FormLabel component="legend"
        sx={{ fontSize: '1.3rem', color: 'black' }}>
        {title}
      </FormLabel>
      <RadioGroup
        row
        name={'question'+id}
        value={respondido}
        aria-required="true"
      >
        <FormControlLabel onClick={() => retorno('Sim')} value='Sim' control={<Radio />} label={
          <Typography color={'black'}>Sim</Typography>} />
        <FormControlLabel onClick={() => retorno('Não')} value='Não' control={<Radio />} label={
          <Typography color={'black'}>Não</Typography>} />
      </RadioGroup>
      <FormLabel component="legend" sx={{ fontSize: '1.2rem', color: 'black' }}>
        {description}
      </FormLabel>
      {campoMensagem}
    </Box>
  );
}