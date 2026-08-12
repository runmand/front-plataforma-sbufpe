import { Box, Typography, useMediaQuery } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { theme } from 'src/core/theme';

export default function Index() {
  const largeQuery = useMediaQuery('(min-width:720px)')
  const [link, setLink] = React.useState<string>(null);

	async function handleReset() {
		const http = axios.create({ baseURL: process.env.API_URL });
		const r = await http.get("/biopen/aps")
    if (r.data.data.link != undefined){
      setLink(r.data.data.link);
    } 
	}

  handleReset();

  return(
    <Box
    sx={{
      background: theme.greyLight,
      marginTop:'5rem',
      paddingTop:!largeQuery? '2rem' : '1rem',
      minHeight:'88vh',
      display:'flex',
      flexDirection:'column',
      justifyContent:'center'}}>
          <Box
      sx={{
        alignContent:'center',
        display:'flex', 
        flexDirection:'column',
        textAlign:'center'}}>
      <Typography
        variant='h4'
        sx={{
          color:theme.primaryColor,
					textAlign:'center',
					fontWeight:'bold',
					paddingY:'1rem'}}>
          APS
      </Typography>
      {link ? (
        <Box>
        <iframe
          title="APS respondentes"
          style={{
            minHeight: largeQuery ? '600px' : '350px',
            width:'100%'}}
          src={link} allow="fullscreen"></iframe>
        </Box>
        ) : (
          <></>
        )}
      
  </Box>
    </Box>
  )
}