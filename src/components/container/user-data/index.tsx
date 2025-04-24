import { Box, Typography, useMediaQuery } from '@mui/material';
import * as React from 'react';
import { theme } from 'src/core/theme';

export default function Index() {
  const largeQuery = useMediaQuery('(min-width:720px)')

  return(
    <Box sx={{							
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
            USUÁRIOS RESPONDENTES
        </Typography>
        <Box>
          <iframe
            title="Usuários respondentes"
            style={{
              minHeight:'600px',
              width:'100%'}}   
            src="https://app.powerbi.com/view?r=eyJrIjoiNmMxYTU1YzItYmM4YS00ZjY4LTlhOWItNjM4NWE2N2IxOGIxIiwidCI6ImE2NTk5NGY3LTU1MjgtNGE4NC1iODU3LWJmMDRlMDBjNGRhNCJ9"
            allow="fullscreen"></iframe>
        </Box>
    </Box>

    </Box>
  )
}