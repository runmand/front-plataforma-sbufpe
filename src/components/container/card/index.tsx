
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { TPROPS } from "./type"


export default function Index({article, author,}: TPROPS ){

  return (
    <Card sx={{ 
      width: 300,
      height: 250,
      textAlign:'center',}}>
      <CardContent
        sx={{
          padding:'15px',
          display:'flex',
          flexDirection:'column',          
          gap:'15px',          
          }}>
        <Typography sx={{ fontSize: 15, paddingTop: '15px' }} >
          {article}
        </Typography>
        <Typography 
        variant="body2"
        sx={{paddingTop: '15px'}}
        >
          {author}
        </Typography>
      </CardContent>
    </Card>
  );
}

