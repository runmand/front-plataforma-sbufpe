import React, { CSSProperties, useEffect, useState } from 'react';
import { white } from 'src/core/colors';
import LoginModal from '@components/modal/log-in/index';
import SignupModal from '@components/modal/sign-up/index';
import { Box, Button, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { theme } from 'src/core/theme';
import { routerEnum } from 'src/core/enums';

export default function Index() {
	const router = useRouter();
	const [isOpenLogin, setIsOpenLogin] = React.useState<boolean>(false);
	const [isOpenSignup, setIsOpenSignup] = React.useState<boolean>(false);
	const largeQuery = useMediaQuery('(min-width:720px)')

	const handleShowPageContact = () => {
		router.push('')
	}

  const handleShowTclePage = () => {
		router.push(routerEnum.TCLE)
	}

  useEffect(() => {
    const handleLoginEvent = () => {
      setIsOpenLogin(true)
    };

    // Adiciona o listener para o evento personalizado
    window.addEventListener('clickLoginEvent', handleLoginEvent);

    // Remove o listener quando o componente é desmontado
    return () => {
      window.removeEventListener('clickLoginEvent', handleLoginEvent);
    };
  }, []);

	return(
    <>
      <Button
        style={{
          fontWeight: 'bold',
          color:theme.white
          // fontSize: largeQuery ? '0.875rem' : '0.7rem'
        }}
        onClick={() => setIsOpenLogin(true)}>
          Entrar
      </Button>
      <Box sx={{position: 'absolute'}}>
        <LoginModal
          isOpen={isOpenLogin}
          canSkip={true}
          onClose={() => {
            setIsOpenLogin(false);
          }}
          openSignupModal={() => setIsOpenSignup(true)}
          openContact={() => handleShowPageContact()}/>
        <SignupModal
          isOpen={isOpenSignup}
          canSkip={true}
          onClose={() => {
            setIsOpenSignup(false);            
          }}
          openTclePage={() => handleShowTclePage()}/>
      </Box>
    </>
	);
}
