import { Box, Typography } from "@mui/material";
import { theme } from "src/core/theme";

export default function Index(){
  return(
    <>
      <Box 
      sx={{
        height:'59vh',
        background:theme.greyLight,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',

      }}>
        <Typography
        sx={{
          padding:'1rem',
          color:theme.primaryColor,
        }}
        variant="h4">
          Como Chegar
        </Typography>
        <iframe 
        style={{
          width:'100%',
          height:'50vh'
        }}
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDI_4mjsaaXy4PjO6wyXpNyTAi7_mK1nGw&q=Av.+Prof.+Moraes+Rego,+1235+-+Cidade+Universitária,+Recife+-+PE,+50670-420/@-8.0523305,-34.9450931,17z" ></iframe>
      </Box>
    </>
  )
}