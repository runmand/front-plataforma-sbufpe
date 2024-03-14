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
          title="Report Section"
          style={{
            minHeight:'600px',
            width:'100%'}}   
          src="https://app.powerbi.com/view?r=eyJrIjoiZWE5YWYxNzgtNWI5ZS00YzBkLTlkOTktNTVmMWQzNjM2ZDFjIiwidCI6ImE2NTk5NGY3LTU1MjgtNGE4NC1iODU3LWJmMDRlMDBjNGRhNCJ9"></iframe>
        </Box>
  </Box>
  )
}