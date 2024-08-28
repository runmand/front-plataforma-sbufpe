import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { theme } from 'src/core/theme';

export default function Index() {
  return(
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
					paddingY:'2rem'}}>
          APS
      </Typography>
      <Box>
        <iframe
          title="Aps respondentes"
          style={{
            minHeight:'600px',
            width:'100%'}}   
          src="https://app.powerbi.com/view?r=eyJrIjoiMDAxYWIzYzAtOGJhZS00ZmVmLWIyNTUtMjlkZTJjZmM3OTY4IiwidCI6ImE2NTk5NGY3LTU1MjgtNGE4NC1iODU3LWJmMDRlMDBjNGRhNCJ9" allow="fullscreen"></iframe>
        </Box>
  </Box>
  )
}