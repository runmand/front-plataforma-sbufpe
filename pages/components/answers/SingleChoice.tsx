import RadioGroup from '@mui/material/RadioGroup';
import { FormControlLabel, Radio, Typography } from '@mui/material';

export default function SingleChoice(props: { choices: string[] | number[]; onClick: (index: number) => void }) {
  return (
    <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
      {props.choices.map((choice, index) => (
        <FormControlLabel
          key={index}
          label={
            <Typography color={'#fff'} fontSize={8}>
              {choice}
            </Typography>
          }
          value={index}
          control={
            <Radio
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 8,
                  color: '#fff',
                },
              }}
            />
          }
          onClick={() => props.onClick(index)}
        />
      ))}
    </RadioGroup>
  );
}
