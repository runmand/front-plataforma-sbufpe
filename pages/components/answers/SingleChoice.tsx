import RadioGroup from '@mui/material/RadioGroup';
import { FormControlLabel, Radio, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';

export default function SingleChoice(props: { choices: string[] | number[]; onClick: (index: number) => void }) {
  return (
    <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
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
                  fontSize: 8,
                },
              }}
            />
          }
          label={
            <Typography color={'#fff'} fontSize={8}>
              {choice}
            </Typography>
          }
          sx={{ marginBottom: 1 }}
          onClick={() => props.onClick(index)}
        />
      ))}
    </RadioGroup>
  );
}
