import React, { useEffect, useState } from 'react';
import { http } from 'src/core/axios';
import { TProps } from './type';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function Index(props: TProps){
  const [link, setLink] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function handleReset() {
      try {
        const res = await http.get(`/bi${props.type}/${props.form}`);
        if (res.data.link) {
          setLink(res.data.link);
        }
      } catch (error) {
        console.error("Erro ao carregar o link:", error);
      } finally {
        setLoading(false);
      }
    }

    handleReset();
  }, [props.type, props.form]);

  return (
    <Box
      sx={{
        marginTop: "12vh",
        width: '100%',
        height: "85vh",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography textAlign="center" fontSize="32pt" color="#6D141A" margin="auto">
      {props.type === 'closed' ? 'Dados ' : 'Respondentes '} {props.form.toUpperCase()} 

      </Typography>

      {loading ? (
        <CircularProgress color="secondary" />
      ) : link ? (
        <Box sx={{ width: '100%', minHeight: '600px' }}>
          <iframe
            title={`${props.form} data Analysis`}
            style={{ width: '100%', height: '100%' }}
            src={link}
            allow="fullscreen"
          ></iframe>
        </Box>
      ) : (
        <Typography color="error">Link não disponível</Typography>
      )}
    </Box>
  );
}