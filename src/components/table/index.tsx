import { planAnswer, praticalAnswerObj, praticalJSON, praticalResponse, PROPS } from '@components/data/type';
import React, { useEffect, useState } from "react";
import styled from '@emotion/styled';
import { IFirstStep, IFourthStep, ISecondStep, IStepsValues, IThirdStep } from 'pages/planeja-pratico';

export function fisrtStep(data: IFirstStep[]): string {
  let response = '';
  data.forEach(element => {
    response += `Dominio: ${element.domain}, Primeiro indicador: ${element.first_indicator}, Primeiro degrau: ${element.first_degree}, Segundo indicador: ${element.second_indicator}, Segundo degrau: ${element.second_degree}. `;
  });
  return response;
}

export function secondStep(data: ISecondStep): string {
  let response = '';
  data.defined_problems.forEach((element, index) => {
    response += `${index + 1}° problema: ${element.answer}, `;
  });
  return response;
}

export function thirdStep(data: IThirdStep): string {
  try {
    let response = '';
    data.causas.forEach((element, index) => {
      response += `${index + 1} causa:, causa: ${element.causa}, explicação: ${element.explicacao}. `;
    });
    return response;
  } catch (error) {
    return "Não informado";
  }
}

export function fourthStep(data: IFourthStep): string {
  try {
    let response = `Nó Critico: ${data.criticalNode}, Link mapa mental: ${data.mentalMapUrl}. `;
    data.actions.forEach((element, index) => {
      response += `Ação ${index + 1}: Nome: ${element.name}, Prazo: ${element.deadline_compliance}. `;
      element.resources.forEach((res, indexRes) => {
        response += `Recurso ${indexRes}: recurso: ${res.resource}, Prazo: ${res.itsCricticalResource}, Descrição da estratégia: ${res.described_strategies}. `;
      });
      element.responsibles.forEach((respo, indexRespo) => {
        response += `Responsabilidade ${indexRespo}: Responsável: ${respo.responsible}, Estratégia: ${respo.strategies}, Motivação: ${respo.motivation}. `;
      });
    });
    return response;
  } catch (error) {
    console.log(data);
    return "Não informado";
  }
}

export default function Index(props: PROPS) {
  const { planAnswer, praticalAnswer } = props;
  const [tempDataPratical, setTempDataPratical] = useState<praticalAnswerObj[]>();

  useEffect(() => {    
    if (praticalAnswer !== undefined) {
      const tempData: praticalAnswerObj[] = [];
      praticalAnswer.forEach(element => {
        const dataJson: praticalJSON = JSON.parse(element.question_answer);
        const data: praticalResponse = {
          firstStep: fisrtStep(dataJson.firstStep),
          secondStep: secondStep(dataJson.secondStep),
          thirdStep: thirdStep(dataJson.thirdStep),
          fourthStep: fourthStep(dataJson.fourthStep),
          dados_para_certificado: dataJson.dados_para_certificado,
        };
        tempData.push({
          id: element.id,
          createdAt: element.createdAt,
          deletedAt: element.deletedAt,
          dataAnwser: data,
          userId: element.userId,
        });
      });
      setTempDataPratical(tempData);
    }
  }, [praticalAnswer]);

  return (
    planAnswer !== undefined ? (
      <CardWrapper>
        {planAnswer.map((item, index) => (
          <Card key={index}>
            <Title>{`Planejamento ${index + 1}`}</Title>
            {item.map((element, subIndex) => (
              <CardInfo key={subIndex}>
                <Title>{element.title}</Title>
                <Info>{element.answer || "Não informado"}</Info>
                {element.justify && <Info>{`Justificativa: ${element.justify}`}</Info>}
              </CardInfo>
            ))}
          </Card>
        ))}
      </CardWrapper>
    ) : tempDataPratical ? (
      <CardWrapper>
        {tempDataPratical.map((item, index) => (
          <Card key={index}>
            <CardInfo>
              <Title>Nome</Title>
              <Info>{item.dataAnwser?.dados_para_certificado?.names || "Não informado"}</Info>
            </CardInfo>

            <CardInfo>
              <Title>Estabelecimento</Title>
              <Info>{item.dataAnwser?.dados_para_certificado?.health_establishment || "Não informado"}</Info>
            </CardInfo>
            
            <CardInfo>
              <Title>Email</Title>
              <Info>{item.dataAnwser?.dados_para_certificado?.email || "Não informado"}</Info>
            </CardInfo>
            
            <CardInfo>
              <Title>Primeiro Passo</Title>
              <Info>{item.dataAnwser?.firstStep || "Não informado"}</Info>
            </CardInfo>

            <CardInfo>
              <Title>Segundo Passo</Title>
              <Info>{item.dataAnwser?.secondStep || "Não informado"}</Info>
            </CardInfo>

            <CardInfo>
              <Title>Terceiro Passo</Title>
              <Info>{item.dataAnwser?.thirdStep || "Não informado"}</Info>
            </CardInfo>

            <CardInfo>
              <Title>Quarto Passo</Title>
              <Info>{item.dataAnwser?.fourthStep || "Não informado"}</Info>
            </CardInfo>
          </Card>
        ))}
      </CardWrapper>
    ) : <></>
  );
}

// Estilos
const CardWrapper = styled.div`
  width: 100%;
  height: 450px; /* Ajusta a altura automaticamente ao conteúdo */
  display: flex;
  flex-wrap: nowrap; /* Impede quebra de linha */
  gap: 20px; /* Espaço entre os cards */
  overflow: auto; 
  border: 1px solid #6D141A;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px #6D141A;
  margin: 10px;
  padding: 10px;
  scroll-behavior: smooth; /* Rolagem suave */
`;


const Card = styled.div`
  width: 350px; /* Define largura mínima dos cards */
  height: 400px; /* Ajusta a altura automaticamente */
  padding: 15px;
  border: 1px solid #6D141A;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px #6D141A;
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Habilita a rolagem interna */
  flex-shrink: 0; /* Impede que os cards diminuam ao longo do eixo */
`;

const Title = styled.h3`
  font-size: 16px;
  color: #6D141A;
`;

const Info = styled.p`
  font-size: 14px;
  color: #333;
`;

const CardInfo = styled.div`
  border-bottom: 1px solid #6D141A;
  padding: 8px 0;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
