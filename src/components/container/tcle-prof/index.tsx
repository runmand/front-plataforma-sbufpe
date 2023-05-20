import * as React from 'react';
import { theme } from 'src/core/theme';
import Box from '@mui/material/Box';
import { Typography, TextareaAutosize, TextField } from '@mui/material';

export default function Index() {
  return (
    <Box
      sx={{
        width: 1,
        // height: '60vh',
		position:'justify',
		margin: 'auto',
	  }}
    >
		<Box
			sx={{
				height: '100vh',
				textAlign: 'center',
				margin: '0 15vw',
				backgroundColor: theme.greyLight
			}}
		>
			<Typography
				sx={{
					color: theme.primaryColor,
					padding: '3vh 0',
				}}
                variant= "h4"
			>
				Termo de Consentimento Livre e Esclarecido
			</Typography>
			<embed
				src='./pdfs/TCLE.pdf'
				type="application/pdf"
				// TODO: Ajustar height e width
				width="95%"
				height="85%"
			/>
		</Box>
	</Box>
  );
}