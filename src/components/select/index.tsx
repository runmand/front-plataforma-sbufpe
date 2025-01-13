import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { itemType, Tprop } from './type';
import { useEffect, useState } from 'react';

export default function Index(props: Tprop) {
  const [item, setItem] = useState<String>('*');  
  function handleChange(event: SelectChangeEvent){
    if (event.target.value !== "*"){
      const value = props.list[Number(event.target.value)];    
      setItem((event.target.value))
      props.setFilter(props.type, value);
    }else{
      setItem("*")
      props.setFilter(props.type, "*");
    } 
  }


  return(
    <>
      <FormControl size="small" className={props.className} sx={{m: 1, minWidth: 170, 
        ...(props.className === "grid-establishment" && {
          gridArea: "establishment",
        }),
        ...(props.className === "grid-city" && {
          gridArea: "city",
          gridColumnStart: 0,
          gridColumnEnd: 5,
          m: 'auto',
        }),
      }}>
        <InputLabel sx={{fontSize: "15px", color: "#fff", fontWeight: "bold"}} id="demo-select-small-label">{props.title}</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={item}
          sx={{
            color: "#fff", // Define a cor do texto
            ".MuiSelect-nativeInput": {
              opacity: 0,
              background: "transparent" 
            },
          }}
          onChange={handleChange}
          renderValue={(selected) =>
            selected === "*" ? "Qualquer" : props.list[Number(selected)]
          }>
          <MenuItem value={"*"}>Qualquer</MenuItem>
          {props.list.map((item, index) =>(
            <MenuItem key={index} value={index}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );

}