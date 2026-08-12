import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { theme } from 'src/core/theme';

type TProps ={
  setMyDataFilter: (arg: boolean) => void
}

export default function Index(props : TProps){

  function changeSwitch(event: React.ChangeEvent<HTMLInputElement>, checked: boolean){
    props.setMyDataFilter(checked)

  }

  return (
    <FormGroup sx={{
      [theme.breakpoints.down('sm')]: {
        m: 1.5, 
        minWidth: 100
      },
    }}>
      <FormControlLabel control={<Switch defaultChecked={false} onChange={changeSwitch} />} label="Suas respostas" />
    </FormGroup>
  )
}