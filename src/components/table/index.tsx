import { planAnswer, praticalAnswerObj, praticalJSON, praticalResponse, PROPS } from '@components/data/type';
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
  padding: 2px;
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
  word-break: break-all;
`;

const Tr = styled.tr`
`;

export function fisrtStep(data: IFirstStep[]):string {
  let response = ''
  data.forEach(element => {
    response += `Dominio: ${element.domain}, Primeiro indicador: ${element.first_indicator}, Primeiro degrau: ${element.first_degree}, Segundo indicador: ${element.second_indicator}, Segundo degrau: ${element.second_degree}`
  });
  return response;
}

export function secondStep(data: ISecondStep):string {
  let response = ''
  data.defined_problems.forEach((element, index) => {
    response += `${index+1}° problema: ${element.answer}, `
  });
  return response;
}

export function thirdStep(data: IThirdStep):string {
  try {
    let response = ''
    data.causas.forEach((element, index) => {
      response += `${index+1} causa:, causa: ${element.causa}, explicação: ${element.explicacao}`
    });
    return response
  } catch (error) {
    return "Não informado"
  }
}

export function fourthStep(data: IFourthStep):string {
  try {
    let response = `Nó Critico: ${data.criticalNode}, Link mapa mental: ${data.mentalMapUrl}`
    data.actions.forEach((element, index) => {
      response += `Acão ${index+1}: Nome: ${element.name}, Prazo: ${element.deadline_compliance}. `
      element.resources.forEach((element, indexRes) => {
        response += `Rescurso ${indexRes}: recurso: ${element.resource}, Prazo: ${element.itsCricticalResource}, Descrição da estrategia: ${element.described_strategies}.`
      });
      element.responsibles.forEach((element, indexRespo) => {
        response += `Responsabilidade ${indexRespo}: Responsavel: ${element.responsible}, Estrategia: ${element.strategies}, Motivação: ${element.motivation}`
      });
    });
    return response;

  } catch (error) {
    console.log(data);
    
    return "Não informado"
  }

}

export default function Index(props: PROPS) {
  const { planAnswer, praticalAnswer } = props;
  const [tempDataPratical, setTempDataPratical] = useState<praticalAnswerObj[]>();



  useEffect(() =>{    
    if (praticalAnswer != undefined){
      const tempData:praticalAnswerObj[] = []
      praticalAnswer.forEach(element => {
        const dataJson: praticalJSON = JSON.parse(element.question_answer);   
        const data: praticalResponse = {
          firstStep: fisrtStep(dataJson.firstStep),
          secondStep: secondStep(dataJson.secondStep),
          thirdStep: thirdStep(dataJson.thirdStep),
          fourthStep: fourthStep(dataJson.fourthStep),
          dados_para_certificado: dataJson.dados_para_certificado
        }            
        tempData.push(
          {
            id: element.id,
            createdAt: element.createdAt,
            deletedAt: element.deletedAt,
            dataAnwser: data,
            userId: element.userId,
          }) 
      });
      setTempDataPratical(tempData)
    }
  }, [praticalAnswer])

  return (
    (planAnswer != undefined ?
    <TableWrapper>
      <Table>
        <thead>
        <Tr>
            {planAnswer[0].map((item, index) => (
              <React.Fragment key={index}>
                <Th>{item.title}</Th>
                {item.questionId !== 9 ? (
                  <Th>{item.titleJustify}</Th>
                ) : (null
                )}
              </React.Fragment>
            ))}
          </Tr>
        </thead>
        <tbody>
          {planAnswer.map((item, index) => (
            <Tr key={index}>
              {item.map((element, index) => (
                <React.Fragment key={index}>
                  {element.questionId == 9 ? (
                    <Td key={index}>{element.answer}</Td>
                     ) : (
                      <><Td key={element.id}>{element.answer}</Td>
                      <Td key={element.id+.1}>{element.justify}</Td></>)}
                </React.Fragment> 
      
              ))}
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>: 
    (tempDataPratical ? 
      <TableWrapper>
        <Table>
          <thead>
            <Tr>
            <Th>Numero</Th>
            <Th>Nomes</Th>
            <Th>Estabelecimento</Th>
            <Th>Email</Th>
            <Th>Primeiro passo</Th>
            <Th>Segundo passo</Th>
            <Th>Terceiro passo</Th>
            <Th>Quarto passo</Th>
            </Tr>
          </thead>
          <tbody>
            {tempDataPratical.map((item, index)=>(
              <Tr key={index}>
                <Td>{index+1}</Td>
                <Td>{item.dataAnwser?.dados_para_certificado?.names || 'Não informado'}</Td>
                <Td>{item.dataAnwser?.dados_para_certificado?.health_establishment || 'Não informado'}</Td>
                <Td>{item.dataAnwser?.dados_para_certificado?.email || 'Não informado'}</Td>
                <Td>{item.dataAnwser?.firstStep || 'Não informado'}</Td>
                <Td>{item.dataAnwser?.secondStep || 'Não informado'}</Td>
                <Td>{item.dataAnwser?.thirdStep || 'Não informado'}</Td>
                <Td>{item.dataAnwser?.fourthStep || 'Não informado'}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
    </TableWrapper>: <></>
    )
  )
  );
}
