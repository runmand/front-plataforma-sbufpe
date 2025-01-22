import { Download } from '@mui/icons-material';

import { DownloadButton } from './styled';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { filterApply, filterTeoric, planAnswer, praticalAnswer, praticalAnswerObj, praticalCSV, praticalJSON, praticalResponse, typeData } from '@components/data/type';
import { firstStep, fourthStep, secondStep, thirdStep } from '@components/newTable/pratical';
import { useSnackbar } from 'notistack';

type PROP = {
  teoric: planAnswer[][]
  pratical: praticalAnswer[]
  typeUsed: typeData;
  filterApply: filterApply;
  filterApplyPratical: filterApply;

}

export default function Index(prop: PROP) {
  const {typeUsed, teoric, pratical} = prop;
	const { enqueueSnackbar } = useSnackbar();

  function filterTeoricByCity(city: string, filter: string){      
      if (filter == "*" || filter == ""){
        return true;
      }else{        
        if (city.toLocaleLowerCase().search(`${filter.toLocaleLowerCase()}`) != -1) return true;
        else return false;
      }
  }

  function filterTeoricByEstablishment(establishment: string, filter: string){
    if (filter == "*" || filter == ""){
      return true;
    }else{      
      if (establishment.toLocaleLowerCase().search(`${filter.toLocaleLowerCase()}`) != -1) return true;
      else return false;
    }
  }

  function createTeoric(): string[][]{
    const newData:planAnswer[][] = []
    const myId = Number(localStorage.getItem("userId"))   
    const filter = prop.filterApply    

    teoric.forEach(element => {
      if (filter.myData){
        if (element[0].userId != myId){
          return;
        }
      }

      if (filterTeoricByCity(element[1].answer, filter.city) && filterTeoricByEstablishment(element[2].answer, filter.establishment)){
        newData.push(element);
      }
    });

    let data = newData;

    if (data.length > 0){
      const headers: string[] = [];

      const formattedData: string[][] = []
  
      data[0].forEach(element => {
        headers.push(element.title)
        if (element.title == "Nome") headers.push("Profissional: ")
        
        if (element.questionId !== 9) headers.push(element.titleJustify)
      });
  
      console.log(data);
      

      data.forEach(element =>{
        const tempData: string[]= [];
        element.forEach(item => {
          tempData.push(item.answer)
          if (item.questionId !== 9) tempData.push(item.justify)
          if (item.title == "Nome") tempData.push(item.typeUser) 
        });
        formattedData.push(tempData);
      })
  
      
  
      formattedData.unshift(headers);    
  
      return formattedData;
    }else{
      return [];
    }
  }

  function formattedArray(array: string[], size: number){
    const response: string[] = []
    for (let index = 0; index < size; index++) {
      if (array[index] != undefined){
        response.push(array[index])
      }else{
        response.push("Não informado")
      }
    }

    return response
  }

  function createPratic(): string[][]{
    const formattedData: string[][] = []
    const header = ['Numero',
    'Nomes',
    'Estabelecimento',
    'Email',
    'Municipio',
    'Profissional',
    "Primeiro passo 1° Indicador",
    "Primeiro passo 2° Indicador",
    "Primeiro passo 3° Indicador",
    "Segundo passo 1° Problema",
    "Segundo passo 2° Problema",
    "Segundo passo 3° Problema",
    "Segundo passo 4° Problema",
    "Segundo passo 5° Problema",
    "Terceiro passo",
    "Quarto passo 1° Ação",
    "Quarto passo 2° Ação",
    "Quarto passo 3° Ação",
    "Quarto passo 4° Ação"]

    
    pratical.forEach((element, index) => {
      const dataJson: praticalJSON = JSON.parse(element.question_answer);   
      const first = formattedArray(firstStep(dataJson.firstStep), 3)
      const second = formattedArray( secondStep(dataJson.secondStep), 5)
      const fourth = formattedArray(fourthStep(dataJson.fourthStep), 4)

      const data: string[] = [
        index.toString(),
        dataJson.dados_para_certificado?.names || "Não informado",
        dataJson.dados_para_certificado?.health_establishment || "Não informado",
        dataJson.dados_para_certificado?.email || "Não informado",
        dataJson.dados_para_certificado?.city || "Não informado",
        element.typeUser,
        first[0],
        first[1],
        first[2],
        second[0],
        second[1],
        second[2],
        second[3],
        second[4],
        thirdStep(dataJson.thirdStep),
        fourth[0],
        fourth[1],
        fourth[2],
        fourth[3],
      ]
      formattedData.push(data)            
    });
    

    formattedData.unshift(header)
    
    return formattedData;
  }

  const exportToCSV = () => {
    let formattedData: string[][]= []

    if (typeUsed == 'teorico'){
      formattedData = createTeoric();
    }else{
      formattedData = createPratic();
    }


    if (formattedData.length > 0){
      // Converte para CSV
      const csv = Papa.unparse(formattedData);
    
      // Baixa o arquivo CSV
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      if (typeUsed == 'pratico'){
        saveAs(blob, `SDUFPE-Tabela_exportada_modelo_${typeUsed}.csv`);
      }else{
        saveAs(blob, `SDUFPE-Tabela_exportada_modelo_${typeUsed}.csv`);
      }
    }else{
      enqueueSnackbar('Não existem dados para serem baixados, tente redefinir os filtros', { variant: 'warning' });
    }
  };

return(
  <DownloadButton onClick={() => exportToCSV()}>
    <Download />
  </DownloadButton>
);
}