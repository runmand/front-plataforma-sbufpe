import RadioGroup from '@mui/material/RadioGroup';
import { FormControlLabel, Radio, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';
import { ChangeEvent } from 'react';

export default function SingleChoice(props: {
  choices: string[] | number[];
  onChange: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
}) {
  return (
    <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group" onChange={props.onChange}>
      {props.choices.map((choice, index) => (
        <FormControlLabel
          key={index}
          value={index}
          control={
            <Radio
              sx={{
                color: '#fff',
                '&.Mui-checked': {
                  color: pink[600],
                },
                '& .MuiSvgIcon-root': {
                  fontSize: 6,
                },
              }}
            />
          }
          label={
            <Typography color={'#fff'} fontSize={6}>
              {choice}
            </Typography>
          }
          sx={{ marginBottom: 0.3 }}
        />
      ))}
    </RadioGroup>
  );
}
