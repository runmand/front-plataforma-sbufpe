import { SetStateAction, useState } from "react";
import { Box, Grid, Link, Typography } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from "../card/index";
import { acervo } from "src/shared/dataBase";
import { theme } from 'src/core/theme'

export default function Index(){
  const [search, setSearch] = useState("");
  const newAcervo = acervo.filter((type) => type.type.includes(search) )
  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearch(event.target.value);}

    return(
    <>
    <Box sx = {{
        marginTop:'3rem',
        position:'justify',
        bgcolor:theme.greyLight,}}>
        <Typography 
        sx = {{padding:3}}
        variant = "h2"
        color = {theme.primaryColor}
        textAlign = 'center'
        bgcolor={theme.white}
        >
        Referências
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 200, marginX: 15, marginY: 5 }}
        >
          <InputLabel id="demo-simple-select-autowidth-label">Referencias</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={search}
            onChange={handleChange}
            autoWidth
            label="Referencias">
          <MenuItem value="">
            <em>Referencias</em>
          </MenuItem>
          <MenuItem value={"Avaliação CEO"}>Avaliação CEO</MenuItem>
          <MenuItem value={"Avaliação da APS"}>Avaliação APS</MenuItem>
        </Select>
      </FormControl>
        <Grid 
          container 
          gap = '30px' 
          sx = {{
            margin:'auto', 
            justifyContent:'center',
            paddingY:3}}>
          {newAcervo.map((item,index)=>(
            <Link
            key = {index}
            href = {item.link}
            target = {"_blank"}
            underline= "none"
            >
            <Card
              key = {index}
              article = {item.article}
              author = {item.author}
            />
            </Link>   
        ))}
      </Grid>
    </Box>
    </>
  )
}