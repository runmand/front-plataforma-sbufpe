import { Download } from '@mui/icons-material';
import { DownloadButton } from './styled';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { planAnswer, praticalAnswer, praticalAnswerObj, praticalCSV, praticalJSON, praticalResponse, typeData } from '@components/data/type';
import { fisrtStep, fourthStep, secondStep, thirdStep } from '@components/table';

type PROP = {
  teoric: planAnswer[][]
  pratical: praticalAnswer[]
  typeUsed: typeData;
}

export default function Index(prop: PROP) {
  const {typeUsed, teoric, pratical} = prop;
  
  function createTeoric(): string[][]{
    let data = teoric;

    const headers: string[] = [];

    const formattedData: string[][] = []

    data[0].forEach(element => {
      headers.push(element.title)
      if (element.questionId !== 9) headers.push(element.titleJustify)
    });

    data.forEach(element =>{
      const tempData: string[]= [];
      element.forEach(item => {
        tempData.push(item.answer)
        if (item.questionId !== 9) tempData.push(item.justify)
      });
      formattedData.push(tempData);
    })

    formattedData.unshift(headers);

    return formattedData;
  }

  function createPratic(): string[][]{
    const formattedData: string[][] = []
    console.log(pratical);

    const header = ['Numero',
    'Nomes',
    'Estabelecimento',
    'Email',
    'Primeiro passo',
    'Segundo passo',
    'Terceiro passo',
    'Quarto passo']

    pratical.forEach((element, index) => {
      const dataJson: praticalJSON = JSON.parse(element.question_answer);   
      const data: string[] = [
        index.toString(),
        dataJson.dados_para_certificado?.names || "Não informado",
        dataJson.dados_para_certificado?.health_establishment,
        dataJson.dados_para_certificado?.email,
        fisrtStep(dataJson.firstStep),
        secondStep(dataJson.secondStep),
        thirdStep(dataJson.thirdStep),
        fourthStep(dataJson.fourthStep),
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


    // Converte para CSV
    const csv = Papa.unparse(formattedData);
  
    // Baixa o arquivo CSV
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'tabela_exportada.csv');
  };

return(
  <DownloadButton onClick={() => exportToCSV()}>
    <Download />
  </DownloadButton>
);
}