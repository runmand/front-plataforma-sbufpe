import { Box, Button, Link, Typography, useMediaQuery } from '@mui/material';
import { theme } from 'src/core/theme';

export default function Index() {
	const largeQuery = useMediaQuery('(min-width:720px)')

  return (
    <Box
    sx={{
      background: theme.greyLight,
      marginTop:'5rem',
      paddingTop:!largeQuery? '2rem' : '1rem',
      minHeight:'88vh',
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
			alignItems: 'center',
    }}
    >
      <Typography variant="h1" style={{ fontSize: '6rem', fontWeight: 'bold', background: 'transparent',color: '#333' }}>
        404
      </Typography>
      <Typography variant="h5" style={{ marginBottom: '1rem', color: '#6D141A' }}>
        Oops! Página não encontrada.
      </Typography>
      <Typography variant="body1" style={{ marginBottom: '2rem', color: '#555' }}>
        A página que você está procurando não existe ou foi movida.
      </Typography>
      <Link href="/">
        <Button variant="contained" color="primary" style={{background:'#921c22'}}>
          Voltar para a página inicial
        </Button>
      </Link>
    </Box>
  );
}
