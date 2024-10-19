import { Download } from '@mui/icons-material';
import { DownloadButton } from './styled';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { planAnswer, typeData } from '@components/data/type';

type PROP = {
  teoric: planAnswer[][]
  pratical: planAnswer[][]
  typeUsed: typeData;
}

export default function Index(prop: PROP) {
  const exportToCSV = (data: planAnswer[][]) => {
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

    // Converte para CSV
    const csv = Papa.unparse(formattedData);
  
    // Baixa o arquivo CSV
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'tabela_exportada.csv');
  };

return(
  <DownloadButton onClick={() => exportToCSV(prop.pratical)}>
    <Download />
  </DownloadButton>
);
}