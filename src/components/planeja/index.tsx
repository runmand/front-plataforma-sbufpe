import { Box, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import { theme } from "src/core/theme";

export const PlanejaQuest = ({ title = '', respondido = '', yesDescr = '', noDescr = '', campoMensagem }: PlanejaProps) => {
  let respondido: 'Sim' | 'Não' = 'Não';
  const retorno = (value: string) => {
    respondido = value;
  }
  
  if (respondido === 'Sim') {
    {yesDescr}
  } else if (respondido === 'Não') {
    {noDescr}
  }

  if (respondido === '') {
    campoMensagem = <TextField required fullWidth multiline rows={4} onChange={(e) => setJustify01(e.target.value)} value={justify01} sx={{ backgroundColor: theme.white }} label="1." />;
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
        name="question01"
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