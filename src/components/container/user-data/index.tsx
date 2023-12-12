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
          USUÁRIOS
      </Typography>
      <Box>
        <iframe
          title="Report Section"
          style={{
            minHeight:'600px',
            width:'100%'}}   
          src="https://app.powerbi.com/view?r=eyJrIjoiOTQ4YzU0MTgtMzY0Zi00MjhkLTg3N2MtNjM1N2M2NzcwMjlkIiwidCI6ImE2NTk5NGY3LTU1MjgtNGE4NC1iODU3LWJmMDRlMDBjNGRhNCJ9"
          allow="fullscreen"></iframe>
        </Box>
  </Box>
  )
}