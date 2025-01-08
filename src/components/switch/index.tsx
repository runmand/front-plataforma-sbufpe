import { FormControlLabel, FormGroup, Switch } from '@mui/material';

type TProps ={
  setMyDataFilter: (arg: boolean) => void
}

export default function Index(props : TProps){

  function changeSwitch(event: React.ChangeEvent<HTMLInputElement>, checked: boolean){
    props.setMyDataFilter(checked)

  }

  return (
    <FormGroup sx={{
      "@media (max-width: 768px)":{
        gridArea: "my",
        ml: 8
      }
    }}>
      <FormControlLabel control={<Switch defaultChecked={false} onChange={changeSwitch} />} label="Suas respostas" />
    </FormGroup>
  )
}