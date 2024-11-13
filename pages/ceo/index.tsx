import Base from '@components/base-layout/index';
import Appbar from '@components/app-bar/index';
import HomeToolbar from '@components/toolbar/home';
import { Avatar, Box, Button, Typography } from '@mui/material';
import FormService from '../../src/pages/form/service';
import React, { useEffect } from 'react';
import { INDEX_RES } from '../../src/pages/form/type';
import { useSnackbar } from 'notistack';
import { ID } from 'src/core/types';
import router from 'next/router';
import { localStorageKeyEnum, routerEnum } from 'src/core/enums';
import NotFound from '@components/not-found/index';
import { theme } from 'src/core/theme';
import FormAnswerService from 'src/pages/form-answer/service';
import NewMenu from '@components/newMenu/index'
import FooterMain from '@components/footer/main/index';
import BiComponent from "@components/bi/index"

export default function Index() {
  return (
    <Base
      appBarChild={<NewMenu/>}
      mainContainerChild= {<BiComponent form='ceo' type='closed'/>}
			footerChild={<FooterMain />}
      />

  );
}

