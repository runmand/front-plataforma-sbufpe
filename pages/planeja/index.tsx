import Base from '@components/base-layout/index';
import Appbar from '@components/app-bar/index';
import HomeToolbar from '@components/toolbar/home';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { theme } from 'src/core/theme';
import SendIcon from '@mui/icons-material/Send';
import { PlanejaQuest } from '@components/planeja';


export default function Index() {
  const [quest01, setQuest01] = useState('');
  const [quest02, setQuest02] = useState('');
  const [quest03, setQuest03] = useState('');
  const [quest04, setQuest04] = useState('');
  const [quest05, setQuest05] = useState('');
  const [quest06, setQuest06] = useState('');
  const [quest08, setQuest08] = useState('');
  const [quest09, setQuest09] = useState('');
  const [quest10, setQuest10] = useState('');
  const [justify01, setJustify01] = useState('');
  const [justify02, setJustify02] = useState('');
  const [justify03, setJustify03] = useState('');
  const [justify04, setJustify04] = useState('');
  const [justify05, setJustify05] = useState('');
  const [justify06, setJustify06] = useState('');
  const [justify07, setJustify07] = useState('');
  const [justify08, setJustify08] = useState('');
  const [justify09, setJustify09] = useState('');
  const [justify10, setJustify10] = useState('');
  var labelQuest01 = '';
  var labelQuest02 = '';
  var labelQuest03 = '';
  var labelQuest04 = '';
  var labelQuest05 = '';
  var labelQuest06 = '';
  var labelQuest08 = '';
  var labelQuest09 = '';
  var labelQuest10 = '';
  var textAreaQuest01;
  var textAreaQuest02;
  var textAreaQuest03;
  var textAreaQuest04;
  var textAreaQuest05;
  var textAreaQuest06;
  var textAreaQuest08;
  var textAreaQuest09;
  var textAreaQuest10;

  if (quest01 === 'Sim') {
    labelQuest01 = 'quais foram as ações feitas?';
  } else if (quest01 === 'Não') {
    labelQuest01 = 'por quê?';
  }

  if (quest02 === 'Sim') {
    labelQuest02 = 'Quais?';
  } else if (quest02 === 'Não') {
    labelQuest02 = 'por que?';
  }

  if (quest03 === 'Sim') {
    labelQuest03 = 'Quais?';
  } else if (quest03 === 'Não') {
    labelQuest03 = 'por quê?';
  }

  if (quest04 === 'Sim') {
    labelQuest04 = 'quais instrumentos você já utilizou?';
  } else if (quest04 === 'Não') {
    labelQuest04 = 'pesquise sobre eles e responda: Quais você identificou no seu município?';
  }

  if (quest05 === 'Sim') {
    labelQuest05 = 'Quais?';
  } else if (quest05 === 'Não') {
    labelQuest05 = 'O que poderia estar incluído?';
  }

  if (quest06 === 'Sim') {
    labelQuest06 = 'Quais?';
  } else if (quest06 === 'Não') {
    labelQuest06 = 'O que poderia estar incluído?';
  }

  if (quest08 === 'Sim') {
    labelQuest08 = 'quais são?';
  } else if (quest08 === 'Não') {
    labelQuest08 = 'pesquise a respeito!';
  }

  if (quest09 === 'Sim') {
    labelQuest09 = 'Quais?';
  } else if (quest09 === 'Não') {
    labelQuest09 = 'Por quê?';
  }

  if (quest10 === 'Sim') {
    labelQuest10 = 'Quais?';
  } else if (quest10 === 'Não') {
    labelQuest10 = 'Por quê?';
  }

  if (labelQuest01 != '') {
    textAreaQuest01 = <TextField required fullWidth multiline rows={4} onChange={(e) => setJustify01(e.target.value)} value={justify01} sx={{ backgroundColor: theme.white }} label="1." />;
  } else {
    textAreaQuest01 = '';
  }

  if (labelQuest02 != '') {
    textAreaQuest02 = <TextField required fullWidth multiline rows={4} onChange={(e) => setJustify02(e.target.value)} value={justify02} sx={{ backgroundColor: theme.white }} label="2." />;
  } else {
    textAreaQuest02 = '';
  }

  if (labelQuest03 != '') {
    textAreaQuest03 = <TextField required fullWidth multiline rows={4} onChange={(e) => setJustify03(e.target.value)} value={justify03} sx={{ backgroundColor: theme.white }} label="3." />;
  } else {
    textAreaQuest03 = '';
  }

  if (labelQuest04 != '') {
    textAreaQuest04 = <TextField required fullWidth multiline rows={4} onChange={(e) => setJustify04(e.target.value)} value={justify04} sx={{ backgroundColor: theme.white }} />;
  } else {
    textAreaQuest04 = '';
  }

  if (labelQuest05 != '') {
    textAreaQuest05 = <TextField required fullWidth multiline rows={4} onChange={(e) => setJustify05(e.target.value)} value={justify05} sx={{ backgroundColor: theme.white }} />;
  } else {
    textAreaQuest05 = '';
  }

  if (labelQuest06 != '') {
    textAreaQuest06 = <TextField required fullWidth multiline rows={4} onChange={(e) => setJustify06(e.target.value)} value={justify06} sx={{ backgroundColor: theme.white }} />;
  } else {
    textAreaQuest06 = '';
  }

  if (labelQuest08 != '' && quest08 != 'Não') {
    textAreaQuest08 = <TextField required fullWidth multiline rows={4} onChange={(e) => setJustify08(e.target.value)} value={justify08} sx={{ backgroundColor: theme.white }} />;
  } else {
    textAreaQuest08 = '';
  }

  if (labelQuest09 != '') {
    textAreaQuest09 = <TextField required fullWidth multiline rows={4} onChange={(e) => setJustify09(e.target.value)} value={justify09} sx={{ backgroundColor: theme.white }} />;
  } else {
    textAreaQuest09 = '';
  }

  if (labelQuest10 != '') {
    textAreaQuest10 = <TextField required fullWidth multiline rows={4} onChange={(e) => setJustify10(e.target.value)} value={justify10} sx={{ backgroundColor: theme.white }} />;
  } else {
    textAreaQuest10 = '';
  }

  return (
    <Base
      appBarChild={<Appbar toolbarChild={<HomeToolbar />} />}
      mainContainerChild={
        <Box sx={{ paddingTop: '6rem', flexGrow: 1, }}>
          <FormControl
            component="fieldset"
            sx={{ padding: '1rem' }}
          >
            <Stack spacing={6}
              margin='2rem'
              direction="column"
            >
              <PlanejaQuest />
              <Box
                sx={{
                  padding: '1rem',
                  width: '100%',
                  borderRadius: theme.borderRadiusSmooth,
                }}
              >
                <FormLabel component="legend"
                  sx={{ fontSize: '1.3rem', color: 'black' }}
                >
                  1. Você e sua equipe realizam algum tipo de planejamento na sua rotina de trabalho?
                </FormLabel>
                <RadioGroup
                  row
                  name="question01"
                  value={quest01}
                  aria-required="true"
                >
                  <FormControlLabel onClick={() => setQuest01('Sim')} value='Sim' control={<Radio />} label={
                    <Typography color={'black'}>Sim</Typography>} />
                  <FormControlLabel onClick={() => setQuest01('Não')} value='Não' control={<Radio />} label={
                    <Typography color={'black'}>Não</Typography>} />
                </RadioGroup>
                <FormLabel component="legend" sx={{ fontSize: '1.2rem', color: 'black' }}>
                  {labelQuest01}
                </FormLabel>
                {textAreaQuest01}
              </Box>

              <Box
                sx={{
                  padding: '1rem',
                  width: '100%',
                  borderRadius: theme.borderRadiusSmooth,
                }}
              >
                <FormLabel component='legend'
                  sx={{ fontSize: '1.3rem', color: 'black' }}>
                  2. Agora que estudamos um pouco sobre o Planejamento Normativo, você consegue observar se algumas dessas características estão presentes na sua rotina de trabalho da Unidade de Saúde à qual você está vinculado?
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="Agora que estudamos um pouco sobre o Planejamento Normativo, você consegue observar se algumas dessas características estão presentes na sua rotina de trabalho da Unidade de Saúde à qual você está vinculado?"
                  name="question02"
                  value={quest02}
                  aria-required="true">
                  <FormControlLabel onClick={() => setQuest02('Sim')} value='Sim' control={<Radio />} label={
                    <Typography color={'black'}>Sim</Typography>} />
                  <FormControlLabel onClick={() => setQuest02('Não')} value='Não' control={<Radio />} label={
                    <Typography color={'black'}>Não</Typography>} />
                </RadioGroup>
                <FormLabel component="legend" sx={{ fontSize: '1.2rem', color: 'black' }}>{labelQuest02}</FormLabel>
                {textAreaQuest02}
              </Box>

              <Box
                sx={{
                  padding: '1rem',
                  width: '100%',
                  borderRadius: theme.borderRadiusSmooth,
                }}
              >
                <FormLabel component='legend'
                sx={{ fontSize: '1.3rem', color: 'black' }}>
                  3. Você consegue perceber ações e/ou componentes do Planejamento Estratégico Situacional (PES) realizados no contexto da sua Unidade de Saúde e/ou município?</FormLabel>
                <RadioGroup
                  row
                  aria-label="Você consegue perceber ações e/ou componentes do Planejamento Estratégico Situacional (PES) realizados no contexto da sua Unidade de Saúde e/ou município?"
                  name="question03"
                  value={quest03}
                  aria-required="true">
                  <FormControlLabel onClick={() => setQuest03('Sim')} value='Sim' control={<Radio />} label={
                    <Typography color={'black'}>Sim</Typography>} />
                  <FormControlLabel onClick={() => setQuest03('Não')} value='Não' control={<Radio />} label={
                    <Typography color={'black'}>Não</Typography>} />
                </RadioGroup>
                <FormLabel component="legend" sx={{ fontSize: '1.2rem', color: 'black' }}>{labelQuest03}</FormLabel>
                {textAreaQuest03}
              </Box>

              <Box
                sx={{
                  padding: '1rem',
                  width: '100%',
                  borderRadius: theme.borderRadiusSmooth,
                }}
              >
                <FormLabel component='legend'
                sx={{ fontSize: '1.3rem', color: 'black' }}>
                  4. Você conhece os instrumentos de planejamento em saúde do seu município?</FormLabel>
                <RadioGroup
                  row
                  aria-label="Você conhece os instrumentos de planejamento em saúde do seu município?"
                  name="question04"
                  value={quest04}
                  aria-required="true">
                  <FormControlLabel onClick={() => setQuest04('Sim')} value='Sim' control={<Radio />} label={
                    <Typography color={'black'}>Sim</Typography>} />
                  <FormControlLabel onClick={() => setQuest04('Não')} value='Não' control={<Radio />} label={
                    <Typography color={'black'}>Não</Typography>} />
                </RadioGroup>
                <FormLabel component="legend" sx={{ fontSize: '1.2rem', color: 'black' }}>{labelQuest04}</FormLabel>
                {textAreaQuest04}
              </Box>

              <Box
                sx={{
                  padding: '1rem',
                  width: '100%',
                  borderRadius: theme.borderRadiusSmooth,
                }}
              >
                <FormLabel component='legend'
                sx={{ fontSize: '1.3rem', color: 'black' }}>
                  5. Existem aspectos relacionados à Saúde Bucal nos instrumentos?</FormLabel>
                <RadioGroup
                  row
                  aria-label="Existem aspectos relacionados à Saúde Bucal nos instrumentos?"
                  name="question05"
                  value={quest05}
                  aria-required="true">
                  <FormControlLabel onClick={() => setQuest05('Sim')} value='Sim' control={<Radio />} label={
                    <Typography color={'black'}>Sim</Typography>} />
                  <FormControlLabel onClick={() => setQuest05('Não')} value='Não' control={<Radio />} label={
                    <Typography color={'black'}>Não</Typography>} />
                </RadioGroup>
                <FormLabel component="legend" sx={{ fontSize: '1.2rem', color: 'black' }}>{labelQuest05}</FormLabel>
                {textAreaQuest05}
              </Box>

              <Box
                sx={{
                  padding: '1rem',
                  width: '100%',
                  borderRadius: theme.borderRadiusSmooth,
                }}
              >
                <FormLabel component='legend'
                sx={{ fontSize: '1.3rem', color: 'black' }}>
                  6. Você participou/participa da construção e do monitoramento das diretrizes, objetivos, metas, indicadores e respectivos resultados?</FormLabel>
                <RadioGroup
                  row
                  aria-label="Você participou/participa da construção e do monitoramento das diretrizes, objetivos, metas, indicadores e respectivos resultados?"
                  name="question06"
                  value={quest06}
                  aria-required="true">
                  <FormControlLabel onClick={() => setQuest06('Sim')} value='Sim' control={<Radio />} label={
                    <Typography color={'black'}>Sim</Typography>} />
                  <FormControlLabel onClick={() => setQuest06('Não')} value='Não' control={<Radio />} label={
                    <Typography color={'black'}>Não</Typography>} />
                </RadioGroup>
                <FormLabel component="legend" sx={{ fontSize: '1.2rem', color: 'black' }}>{labelQuest06}</FormLabel>
                {textAreaQuest06}
              </Box>

              <Box
                sx={{
                  padding: '1rem',
                  width: '100%',
                  borderRadius: theme.borderRadiusSmooth,
                }}
              >
                <FormLabel component='legend' sx={{ fontSize: '1.3rem', color: 'black' }}>
                  7. Compreendendo a importância do planejamento em saúde no âmbito do SUS, que tal relembrarmos quais são os instrumentos utilizados nesse planejamento?</FormLabel>
                <TextField required label="Insira quais são os instrumentos utilizados aqui"
                  fullWidth
                  multiline rows={4}
                  onChange={(e) => setJustify07(e.target.value)}
                  value={justify07}
                  sx={{ backgroundColor: theme.white }} />
              </Box>

              <Box
                sx={{
                  padding: '1rem',
                  width: '100%',
                  borderRadius: theme.borderRadiusSmooth,
                }}
              >
                <FormLabel component='legend' sx={{ fontSize: '1.3rem', color: 'black' }}>
                  8. Você conhece os espaços de governança do SUS, nos quais a sociedade tem possibilidade de atuar nas políticas de saúde</FormLabel>
                <RadioGroup
                  row
                  aria-label="Você conhece os espaços de governança do SUS, nos quais a sociedade tem possibilidade de atuar nas políticas de saúde"
                  name="question08"
                  value={quest08}
                  aria-required="true">
                  <FormControlLabel onClick={() => setQuest08('Sim')} value='Sim' control={<Radio />} label={
                    <Typography color={'black'}>Sim</Typography>} />
                  <FormControlLabel onClick={() => setQuest08('Não')} value='Não' control={<Radio />} label={
                    <Typography color={'black'}>Não</Typography>} />
                </RadioGroup>
                <FormLabel component="legend" sx={{ fontSize: '1.2rem', color: 'black' }}>{labelQuest08}</FormLabel>
                {textAreaQuest08}
              </Box>

              <Box
                sx={{
                  padding: '1rem',
                  width: '100%',
                  borderRadius: theme.borderRadiusSmooth,
                }}
              >
                <FormLabel component='legend' sx={{ fontSize: '1.3rem', color: 'black' }}>
                  9. Você já participou de alguma reunião ou foi membro de algum Conselho de Saúde (municipal, estadual ou nacional)?</FormLabel>
                <RadioGroup
                  row
                  aria-label=""
                  name="question09"
                  value={quest09}
                  aria-required="true">
                  <FormControlLabel onClick={() => setQuest09('Sim')} value='Sim' control={<Radio />} label={
                    <Typography color={'black'}>Sim</Typography>} />
                  <FormControlLabel onClick={() => setQuest09('Não')} value='Não' control={<Radio />} label={
                    <Typography color={'black'}>Não</Typography>} />
                </RadioGroup>
                <FormLabel component="legend" sx={{ fontSize: '1.2rem', color: 'black' }}>{labelQuest09}</FormLabel>
                {textAreaQuest09}
              </Box>

              <Box
                sx={{
                  padding: '1rem',
                  width: '100%',
                  borderRadius: theme.borderRadiusSmooth,
                }}
              >
                <FormLabel component='legend' sx={{ fontSize: '1.3rem', color: 'black' }}>
                  10. Você já teve a experiência de participar da Conferência Municipal ou das etapas estadual (Conferência Estadual de Saúde) e nacional (Conferência Nacional de Saúde)?</FormLabel>
                <RadioGroup
                  row
                  aria-label="Você já teve a experiência de participar da Conferência Municipal ou das etapas estadual (Conferência Estadual de Saúde) e nacional (Conferência Nacional de Saúde)?"
                  name="question10"
                  value={quest10}
                  aria-required="true">
                  <FormControlLabel onClick={() => setQuest10('Sim')} value='Sim' control={<Radio />} label={
                    <Typography color={'black'}>Sim</Typography>} />
                  <FormControlLabel onClick={() => setQuest10('Não')} value='Não' control={<Radio />} label={
                    <Typography color={'black'}>Não</Typography>} />
                </RadioGroup>
                <FormLabel component="legend" sx={{ fontSize: '1.2rem', color: 'black' }}>{labelQuest10}</FormLabel>
                {textAreaQuest10}
              </Box>
              <Button color="success" variant="contained" endIcon={<SendIcon/>} >
                Enviar</Button>
            </Stack>

          </FormControl>
        </Box>
      }
    />
  );
}