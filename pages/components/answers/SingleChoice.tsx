import RadioGroup from '@mui/material/RadioGroup';
import { FormControlLabel, Radio, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';
import { ChangeEvent } from 'react';

export default function SingleChoice(props: {
  choices: string[] | number[];
  onChange: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
}) {
  return (
    <RadioGroup onChange={props.onChange}>
      {(props.choices || []).map((choice, index) => (
        <FormControlLabel
          key={index}
          value={index}
          control={
            <Radio
              sx={{
                padding: '4px',
                color: '#fff',
                '&.Mui-checked': {
                  color: pink[600],
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '20px',
                },
              }}
            />
          }
          label={
            <Typography color={'#fff'} fontSize={'20px'}>
              {choice}
            </Typography>
          }
          sx={{ marginLeft: 0, marginRight: 0, marginBottom: index === props.choices.length - 1 ? 0 : '8px' }}
        />
      ))}
    </RadioGroup>
  );
}
