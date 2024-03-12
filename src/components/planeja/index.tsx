import { Box, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import { theme } from "src/core/theme";
import { PlanejaQuestionProps } from "./type";
import { useState } from "react";

export const PlanejaQuestion = (
  { id = 0, title = '', description = '',
    yesDescr = '', noDescr = '',
    noHasJustify = true, campoMensagem,
  }: PlanejaQuestionProps) => {

  const [respondido, setRespondido] = useState('');
  const [justify, setJustify] = useState('');

  if (respondido === 'Sim') {
    { description = yesDescr }
  } else if (respondido === 'Não') {
    { description = noDescr }
  }

  if (noHasJustify === true && respondido != '') {
    campoMensagem = <TextField required fullWidth multiline rows={4} onChange={(e) => setJustify(e.target.value)} value={justify} sx={{ backgroundColor: theme.white }}/>;
  } else if (respondido === 'Sim') {
    campoMensagem = <TextField required fullWidth multiline rows={4} onChange={(e) => setJustify(e.target.value)} value={justify} sx={{ backgroundColor: theme.white }}/>;
  }

  return (
    <Box>
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
          id={id.toString()}
          row
          name={'question' + id}
          value={respondido}
          aria-required="true"
        >
          <FormControlLabel onClick={() => setRespondido('Sim')} value='Sim' control={<Radio />} label={
            <Typography fontWeight='bold' color={'black'}>Sim</Typography>} />
          <FormControlLabel onClick={() => setRespondido('Não')} value='Não' control={<Radio />} label={
            <Typography fontWeight='bold' color={'black'}>Não</Typography>} />
        </RadioGroup>
        <FormLabel component="legend" sx={{ fontSize: '1.2rem', color: 'black' }}>
          {description}
        </FormLabel>
        {campoMensagem}
      </Box>
    </Box>
  );
}