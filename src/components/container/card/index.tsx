
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { TPROPS } from "./type"


export default function Index({article, author,}: TPROPS ){

  return (
    <Card sx={{ 
      width: 300,
      height: 200,
      textAlign:'center',}}>
      <CardContent
        sx={{
          padding:'10px',
          display:'flex',
          flexDirection:'column',
          alignItems: 'center',
          justifyContent:'center',
          gap:'10px',
          textAlign:'center'
          }}>
        <Typography sx={{ fontSize: 16 }} >
          {article}
        </Typography>
        <Typography variant="body2">
          {author}
        </Typography>
      </CardContent>
    </Card>
  );
}

