import styled from '@emotion/styled';
import TableComponent from "@components/table/";
import { ButtonContainer, GridContainer, MainContainer, UpdateContainer, UpdateInfo, Title, DivLoad} from './styled';
import Base from '@components/base-layout/index';
import Appbar from '@components/app-bar/index';
import HomeToolbar from '@components/toolbar/home';
import { Button, Box, Grid, Skeleton, CircularProgress } from '@mui/material';
import { Download, Refresh, Error } from '@mui/icons-material';
import { LocalData, planAnswer, praticalAnswer, requestResponse, typeData } from './type';
import { useEffect, useState } from 'react';
import { http } from 'src/core/axios';
import { useSnackbar } from 'notistack';
import DownloadCSV from "../csv/index"
import { LoadingButton } from '@mui/lab';
import { IStepsValues } from 'pages/planeja-pratico';
import router from 'next/router';
import { routerEnum } from 'src/core/enums';

export default function Index() {
  const [typeData, setTypeData] = useState<typeData>('teorico');  
  const [tempDataTeoric, setTempDataTeoric] = useState<planAnswer[][]>();
  const [tempDataPratical, setTempDataPratical] = useState<praticalAnswer[]>();
  const [lastUpdateTeoric, setLastUpdateTeoric] = useState<Date>(null);
  const [lastUpdatePratical, setLastUpdatePratical] = useState<Date>(null);
	const { enqueueSnackbar } = useSnackbar();
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [haveError, setHaveError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  function formatDate(date: Date): string {
    if (typeof date == 'string'){
      date = new Date(date);
    }

    if (date != null){
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
    
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    return "Bucando dados..."

  }
  
  async function setTeoric() {  
    setTypeData('teorico')    
    if (tempDataPratical== undefined) await getDataTeoric();
  }

  async function setPratical(){
    setTypeData('pratico')
    if (tempDataPratical == undefined) await getDataPratical();
  }

  async function getLocalStorage() {
    try {
      const data: LocalData = JSON.parse(localStorage.getItem("data"));
      
      if (data.pratical != undefined && data.praticalDate != undefined){
        setTempDataPratical(data.pratical);
        setLastUpdatePratical(data.praticalDate);
        setLoadingData(false);
      }      

      if (data.teoric != undefined && data.teoricDate != undefined){
        setTempDataTeoric(data.teoric);
        setLastUpdateTeoric(data.teoricDate);
        setLoadingData(false);
      }else{
        getDataTeoric();
      }


    } catch (error) {
      if (typeData == 'pratico'){
        setPratical();
      }else{
        setTeoric();
      }
    }


  }

  async function setLocalStorage() {
    const data: LocalData = {
      pratical: tempDataPratical,
      teoric: tempDataTeoric,
      praticalDate: lastUpdatePratical,
      teoricDate: lastUpdateTeoric
    };

    localStorage.setItem("data",JSON.stringify(data))
  }

  async function getDataTeoric() {
    if (haveError) return;
    setLoadingData(true);
    const res: requestResponse = await http.get("/data/teoric")

    if(res.errors){
      enqueueSnackbar(res.errors, { variant: 'error' })
      setHaveError(true);
      setErrorMessage(res.errors[0])
    }else{
      setLastUpdateTeoric(new Date());
      setTempDataTeoric(res.data);
      setLoadingData(false);
    }
  }

  async function getDataPratical() {
    if (haveError) return;
    setLoadingData(true);
    const res: requestResponse = await http.get("/data/pratic")
    
    if(res.errors){
      enqueueSnackbar(res.errors, { variant: 'error' })
      setHaveError(true);
      setErrorMessage(res.errors[0])
    }else{
      setLastUpdateTeoric(new Date());
      setTempDataTeoric(res.data);
      setLoadingData(false);
    }
  }

  async function reloadData() {
    if (typeData == 'teorico' && loadingData == false) getDataTeoric()
    else if(typeData == 'pratico' && loadingData == false) setPratical();
  }

  function goInitial() {
    router.push({ pathname: routerEnum.INITIAL})
    localStorage.removeItem('data')

  }

  useEffect(()=>{
    const id = Number(localStorage.getItem("typeId"));
    id > 2 ? goInitial() : getLocalStorage();
	},[])

  useEffect(() => {
    const updateLocalStorage = async () => {
      await setLocalStorage();
    };
  
    updateLocalStorage();
  }, [tempDataPratical, tempDataTeoric, setLocalStorage]);
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
                {
                  typeData === 'teorico' ? (
                    <>Atualizado: {formatDate(lastUpdateTeoric)}</>
                  ) : (
                    <>Atualizado: {formatDate(lastUpdatePratical)}</>
                  )
                }
              <Button variant="contained" style={{ margin: 'auto' }} onClick={reloadData}>
                Atualizar <Refresh />
              </Button>             
            </UpdateInfo>
          </UpdateContainer>
        </GridContainer>
        {!loadingData ? (
        <>
          {typeData == 'teorico'  ? (
            <TableComponent planAnswer={tempDataTeoric} />
          ): 
            <TableComponent praticalAnswer={tempDataPratical} />
          }
          <DownloadCSV key={1} pratical={tempDataPratical} teoric={tempDataTeoric} typeUsed={typeData} ></DownloadCSV>
        </>
      ) : (
        <>
          {!haveError ? (
          <DivLoad>
          <CircularProgress 
          sx={{ color: '#6D141A' }}
          size={64}
          style={{margin: 'auto'}}/>
          <span style={{margin: 'auto', color: '#6D141A'}}>Carregando dados...</span>
          </DivLoad>): (
            <DivLoad>
            <span style={{margin: 'auto', color: '#6D141A'}}>{errorMessage}</span>
            </DivLoad>
          )}
        </>
      )}
    </MainContainer>
  )

}