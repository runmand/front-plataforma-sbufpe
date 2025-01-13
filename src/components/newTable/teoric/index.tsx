import { DataUser, planAnswer, praticalAnswerObj, praticalJSON, praticalResponse, PROPS } from '@components/data/type';
import React, { useEffect, useState } from "react";
import styled from '@emotion/styled';
import { IFirstStep, IFourthStep, ISecondStep, IStepsValues, IThirdStep } from 'pages/planeja-pratico';

const TableWrapper = styled.div`
  width: 90%;
  overflow-x: auto;
  overflow-y: auto;
  margin: auto;
  border: 1px solid black;
  border-radius: 10px;
  height: 80vh;
  max-height: 70vh;
  @media (max-width: 768px) {
    height: 60vh
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  table-layout: auto;
`;

const Th = styled.th`
  padding: 20px;
  border: 1px solid black;
  background-color: #6D141A;
  color: white;
  width: 20vw;
  min-width: 20vw;
  word-break: keep-all;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid black;
  color: black;
`;

const Tr = styled.tr`
`;


export default function Index(props: PROPS) {
  const { planAnswer, praticalAnswer } = props;
  const [formattedDataTeoric, setFormattedDataTeoric] = useState<planAnswer[][]>([]);
  const [allFormattedDataTeoric, setAllFormattedDataTeoric] = useState<planAnswer[][]>([]);
  const [build, setBuild] = useState<boolean>(false);

  function removeDuplicates(stringsArray: string[]): string[] {
    return Array.from(new Set(stringsArray));
  }

  function capitalizeFirstLetter(text: string): string {
    if (!text) return ""; // Verifica se a string é válida
    const lowerCaseText = text.toLowerCase(); // Converte toda a string para minúsculas
    return lowerCaseText.charAt(0).toUpperCase() + lowerCaseText.slice(1); // Primeira letra maiúscula
  }

  function filterTeoricByCity(city: string, filter: string){
    
      if (city == "*"){
        return true;
      }else{
        if (city.toLocaleLowerCase().search(`cidade: ${filter.toLocaleLowerCase()}`) != -1) return true;
        else return false;
      }
  }

  function filterTeoricByEstablishment(establishment: string, filter: string){
    if (establishment == "*"){
      return true;
    }else{      
      if (establishment.toLocaleLowerCase().search(`estabelecimento: ${filter.toLocaleLowerCase()}`) != -1) return true;
      else return false;
    }
  }

  function filterTeoric(establishment: string, city: string, mydata: boolean){    
    if (establishment == "*" && city == "*" && mydata == false){      
      setFormattedDataTeoric(allFormattedDataTeoric);
    }else{
      const newData: planAnswer[][] = []  
      allFormattedDataTeoric.forEach(element => {  
        const myId = Number(localStorage.getItem("userId"))   
        
        if (mydata){
          if (element[0].userId != myId){
            return;
          }
        }
        
        if (filterTeoricByEstablishment(element[0].answer, establishment) && filterTeoricByCity(element[0].answer, city)){
          newData.push(element);
        }
      });
            
      setFormattedDataTeoric(newData);
    }
  }

  useEffect(() =>{    
      const dataFinal: planAnswer[][] = [];
      const cityArray: string[] = [];
      const establishmentArray: string[] = [];      
      planAnswer.forEach(element =>{
        
        let result: planAnswer[] = []
        let newData: planAnswer = {
          id: 0,
          createdAt: null,
          deletedAt: null,
          userId: null,
          questionId: null,
          title: null,
          answer: ''
        }
        element.forEach(data =>{
          if (data.questionId == 9){
            const answer = data.answer == '' ? "Não informado" : data.answer;
            newData = {
              id: data.id,
              createdAt: data.createdAt,
              deletedAt: data.createdAt,
              userId: data.userId,
              questionId: data.questionId,
              title: "Usuario respondente",
              answer: newData.answer + data.title + ": "+ answer + "\n"
            }

            if (data.title == "Estabelecimento") establishmentArray.push(capitalizeFirstLetter(answer))
          
            if (data.title == "Cidade") cityArray.push(capitalizeFirstLetter(answer))

          }else{       
            if (newData != null){              
              result.push(newData);
              newData = null
            } 
            result.push(data);
          }
        }) 
        dataFinal.push(result);
      })      

      setFormattedDataTeoric(dataFinal);      
      setAllFormattedDataTeoric(dataFinal);

      props.setFilterTeoric({establishment: removeDuplicates(establishmentArray), city: removeDuplicates(cityArray)})         
  }, [praticalAnswer])

  useEffect(() => {
    if (props.filterApply) {
      const filter = props.filterApply;

      if (filter.type == "teorico"){           
        if (build) filterTeoric(filter.establishment, filter.city, filter.myData);
        else setBuild(true);                 
      }
    }
  }, [props.filterApply]);

  return (
    (planAnswer != undefined && allFormattedDataTeoric[0] != null ? 
    <TableWrapper>
      <Table>
        <thead>
        <Tr>
            {allFormattedDataTeoric[0].map((item, index) => (
              <React.Fragment key={index}>
                {item.questionId !== 9 ? (
                  <Th>{item.title}</Th>
                ) : (
                  <Th>{item.title} {item.titleJustify}</Th>
                )}
              </React.Fragment>
            ))}
          </Tr>
        </thead>
        <tbody attr-b={Date.now()}>
          {formattedDataTeoric.map((item, index) => (
            <Tr key={index} >
              {item.map((element, index) => (
                <React.Fragment key={index}>
                  {element.questionId == 9 ? (
                      <Td>
                        {element.answer.split("\n").map((text, index) => (
                        <React.Fragment key={index}>
                          {text}
                          <br />
                          </React.Fragment>
                        ))}
                      </Td>
                     ) : (
                      <Td key={element.id}>{element.answer}, {element.justify}</Td>)}
                </React.Fragment> 
              ))}
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>: 
    (<></>)));
}
