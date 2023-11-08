import { Box, Link, Paper, Typography } from "@mui/material";
import { theme } from "src/core/theme";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import VisibilityIcon from '@mui/icons-material/Visibility';




export default function Index(){

  function createData(
    name: string,
    title: string,
    link: string,
    
  ) {
    return { name, title, link};
  }
  const rows = [
    createData('Monitoramento do Cumprimento de Metas dos Centros de Especialidades Odontológicas em 2022 - Pernambuco','Boletim 2022 Pernambuco - CEO' , 'https://drive.google.com/file/d/1ybZPKj3REGIOuYgxeN79tWiRygrGzW5_/view?usp=drive_link'),
    createData('Monitoramento de Saúde Bucal na Atenção em Primária em Saúde e em Centros de Especialidades Odontológicas em 2022 - Jaboatão dos Guararapes/PE','Boletim 2022 Jaboatão dos Guararapes - CEO e SISAB','https://drive.google.com/file/d/1U2Kmb_PNmA3fwfrw7s8ghkqhR5Kx5CLl/view?usp=drive_link'),
    createData('Monitoramento de produção dos Laboratórios Regionais de Prótese Dentária em 2022 – Pernambuco','Boletim 2022 Pernambuco - LRPD','https://drive.google.com/file/d/1gYTWtZ_2S-dUBiBD0fcPhqcA-EV9uyzj/view?usp=drive_link'),
    createData('Monitoramento de Saúde Bucal na Atenção em Primária em Saúde e em Centros de Especialidades Odontológicas em 2022 -  Recife/PE','Boletim 2022 Recife - CEO e SISAB', 'https://drive.google.com/file/d/1MwVodgoNNa09UvBVU_oCHk-MwXm-lntc/view?usp=drive_link'),
    createData('Monitoramento dos Indicadores de Saúde Bucal na Atenção em Primária em Saúde em 2022 – Pernambuco','Boletim 2022 Pernambuco - SISAB', 'https://drive.google.com/file/d/1TDZmepHLKxCNiadOAsPy-tqNVMPsv_Ch/view?usp=drive_link'),
  ];

  return(
    <Box
    sx={{
        minHeight:'80vh',
        display:"flex",
        justifyContent:"center",  
        backgroundColor: theme.greyLight,
      }}>
        <Paper
          sx={{
            marginTop:'2rem',
            width:'50rem',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center'
        }}
          variant="outlined" elevation={24}>
            <Typography
              variant="h4"
              sx={{
                color:theme.primaryColor,
                textAlign:'center'
              }}
              >Informe - SBPE</Typography>
              <Box
                sx={{
                  padding:'1rem'
                }}>
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'justify',
                  textIndent:'2rem',
                  paddingY:'1rem'
                  }}>
              O OSB/UFPE produz Boletins Técnicos com o objetivo de trazer informações sobre a saúde bucal da Pernambuco.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'justify',
                  textIndent:'2rem',
              }}>
              Um panorama estadual sobre os atendimentos da rede de atenção em saúde bucal da Atenção Primária e Secundária pode ser encontrado, o qual pode servir para análise e tomada de decisão. Informação para a Ação!
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Titulo</TableCell>
                      <TableCell align="center">Arquivo</TableCell>
                      <TableCell align="center">Visualizar</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.title}</TableCell>
                        <TableCell align="center" >
                          <Link 
                            href={row.link}
                            target="_blank"
                            underline="hover"
                            color="inherit">
                            <VisibilityIcon/>
                            </Link>
                          </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              </Box>
        </Paper>
    </Box>
    )
  }