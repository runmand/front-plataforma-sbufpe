import styled from '@emotion/styled';
import TableComponent from "@components/table/";
import { ButtonContainer, GridContainer, MainContainer, UpdateContainer, UpdateInfo, Title} from './styled';
import Base from '@components/base-layout/index';
import Appbar from '@components/app-bar/index';
import HomeToolbar from '@components/toolbar/home';
import { Button, Box } from '@mui/material';
import { Download, Refresh } from '@mui/icons-material';
import { planAnswer, typeData } from './type';
import { useEffect, useState } from 'react';
import { http } from 'src/core/axios';
import { useSnackbar } from 'notistack';
import DownloadCSV from "../csv/index"

export default function Index() {
  const [typeData, setTypeData] = useState<typeData>('teorico');
  const [tempDataTeoric, setTempDataTeoric] = useState<planAnswer[][]>();
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
	const { enqueueSnackbar } = useSnackbar();
  const [loadingData, setLoadingData] = useState<boolean>(true);

  function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
  
  async function setTeoric() {
    setTypeData('teorico')
  }

  async function setPratical(){
    enqueueSnackbar('No momento os dados do planeja pratico não estão disponiveis!', { variant: 'error' });
  }

  async function getDataTeoric() {
    setLoadingData(true);
    const { data } = await http.get("/data/teoric")
    setTempDataTeoric(data);
  }

  async function reloadData() {
    if (typeData == 'teorico' && loadingData == false) getDataTeoric()
    else if(typeData == 'pratico' && loadingData == false) setPratical();
  }


  useEffect(()=>{
    if (typeData == 'teorico'){
      getDataTeoric();
    }

    if (typeData == 'pratico'){
      getDataTeoric();
    }
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

  useEffect(()=>{
    setLoadingData(false);
    setLastUpdate(new Date)
	},[tempDataTeoric])

  return (
    <MainContainer>
        <GridContainer>
          <ButtonContainer>
            <Button variant="contained" style={{ marginLeft: 'auto', backgroundColor: "#921c22" }} onClick={setTeoric}>
              Planeja Teorico
            </Button>
            <Button variant="contained" style={{ marginLeft: 'auto', backgroundColor: "#921c22" }} onClick={setPratical}>
              Planeja Pratico
            </Button>
          </ButtonContainer>
          {typeData == 'teorico' ? (
            <Title>Dados Do planeja Teorico</Title>
          ):
            <Title>Dados Do planeja Pratico</Title>}
          <UpdateContainer>
            <UpdateInfo>
              Atualizado: {formatDate(lastUpdate)}
              <Button variant="contained" style={{ margin: 'auto' }} onClick={reloadData}>
                Atualizar <Refresh />
              </Button>             
            </UpdateInfo>
          </UpdateContainer>
        </GridContainer>
        {!loadingData ? (
        <>
          {typeData == 'teorico' ? (
            <TableComponent planAnswer={tempDataTeoric} />
          ): 
            <TableComponent planAnswer={tempDataTeoric} />
          }
          <DownloadCSV key={1} pratical={tempDataTeoric} teoric={tempDataTeoric} typeUsed={typeData} ></DownloadCSV>
        </>
      ) : (
        <p>Carregando dados...</p> // Melhorar loading
      )}
    </MainContainer>
  )

}