/* eslint-disable react-hooks/exhaustive-deps */
import { DataUser, praticalAnswerObj, praticalJSON, praticalResponse, PROPS } from "@components/old-data/type";
import React, { useEffect, useState } from "react";
import { IFirstStep, IFourthStep, ISecondStep, IStepsValues, IThirdStep } from "src/app/planeja-pratico/page";
import { TableWrapper, Table, Td, Th, Tr } from "../styled";
import { filterBy, removeDuplicates } from "../functions";

export function firstStep(data: IFirstStep[]): string[] {
    let response: string[] = [];
    data.forEach((element) => {
        response.push(
            `Dominio: ${element.domain}, Primeiro indicador: ${element.first_indicator}, Primeiro degrau: ${element.first_degree}, Segundo indicador: ${element.second_indicator}, Segundo degrau: ${element.second_degree}`
        );
    });
    return response;
}

export function secondStep(data: ISecondStep): string[] {
    let response: string[] = [];
    data.defined_problems.forEach((element, index) => {
        response.push(`Problema: ${element.answer}, `);
    });
    return response;
}

export function thirdStep(data: IThirdStep): string {
    try {
        let response = "";
        data.causas.forEach((element, index) => {
            response += `${index + 1} causa:, causa: ${element.causa}, explicação: ${element.explicacao}`;
        });
        return response;
    } catch (error) {
        return "Não informado";
    }
}

export function fourthStep(data: IFourthStep): string[] {
    try {
        let responseArray: string[] = [];
        data.actions.forEach((element, index) => {
            let response = `Nó Critico: ${data.criticalNode}\n`;

            response += `Acão ${index + 1}: Nome: ${element.name}, Prazo: ${element.deadline_compliance}. \n`;
            element.resources.forEach((element, indexRes) => {
                response += `Rescurso ${indexRes}: recurso: ${element.resource}, Prazo: ${element.itsCricticalResource}, Descrição da estrategia: ${element.described_strategies}. \n`;
            });
            element.responsibles.forEach((element, indexRespo) => {
                response += `Responsabilidade ${indexRespo}: Responsavel: ${element.responsible}, Estrategia: ${element.strategies}, Motivação: ${element.motivation} \n`;
            });

            responseArray.push(response);
        });
        return responseArray;
    } catch (error) {
        return [];
    }
}

export default function Index(props: PROPS) {
    const { praticalAnswer } = props;
    const [tempDataPratical, setTempDataPratical] = useState<praticalAnswerObj[]>();
    const [tempAllDataPratical, setTempAllDataPratical] = useState<praticalAnswerObj[]>();
    const [build, setBuild] = useState<boolean>(false);

    function filterPratical(establishment: string, mydata: boolean, city: string, participant: string) {
        if (establishment == "*" && mydata == false && city == "*" && participant == "*") {
            setTempDataPratical(tempAllDataPratical);
        } else {
            const tempData: praticalAnswerObj[] = [];
            const myId = Number(localStorage.getItem("userId"));

            tempAllDataPratical.forEach((data) => {
                if (
                    filterBy(data.dataAnwser.dataUser, establishment, "estabelecimento") &&
                    filterBy(data.dataAnwser.dataUser, city, "município") &&
                    filterBy(data.dataAnwser.dataUser, participant, "profissional")
                ) {
                    if (mydata == true && myId == data.userId) {
                        tempData.push(data);
                    } else if (mydata == false) {
                        tempData.push(data);
                    }
                }
            });
            setTempDataPratical(tempData);
        }
    }

    function createIdentifier(dataUser: DataUser, typeUser: string): string {
        const name = dataUser?.names == undefined ? "Não informado" : dataUser?.names;
        const establishment = dataUser?.health_establishment == undefined ? "Não informado" : dataUser?.health_establishment;
        const email = dataUser?.email == undefined ? "Não informado" : dataUser?.email;
        const city = dataUser?.city == undefined ? "Não informado" : dataUser?.city;
        const type = typeUser == undefined ? "Sem dados, Atualize" : typeUser;
        return `Nome: ${name} \n Estabelecimento: ${establishment} \n Município: ${city}\n Email: ${email} \n Profissional: ${type}`;
    }

    useEffect(() => {
        const tempData: praticalAnswerObj[] = [];
        let establishmentArray: string[] = [];
        let cityArray: string[] = [];
        let participantArray: string[] = [];
        praticalAnswer.forEach((element) => {
            const dataJson: praticalJSON = JSON.parse(element.question_answer);

            const data: praticalResponse = {
                firstStep: firstStep(dataJson.firstStep),
                secondStep: secondStep(dataJson.secondStep),
                thirdStep: thirdStep(dataJson.thirdStep),
                fourthStep: fourthStep(dataJson.fourthStep),
                dataUser: createIdentifier(dataJson.dados_para_certificado, element.typeUser),
            };
            tempData.push({
                createdAt: element.createdAt,
                deletedAt: element.deletedAt,
                dataAnwser: data,
                userId: element.userId,
            });

            establishmentArray.push(
                dataJson?.dados_para_certificado?.health_establishment == undefined
                    ? "Não informado"
                    : dataJson?.dados_para_certificado?.health_establishment
            );
            cityArray.push(dataJson?.dados_para_certificado?.city == undefined ? "Não informado" : dataJson?.dados_para_certificado?.city);
            participantArray.push(element.typeUser == undefined ? "Não informado" : element.typeUser);

            establishmentArray = removeDuplicates(establishmentArray);
            cityArray = removeDuplicates(cityArray);
            participantArray = removeDuplicates(participantArray);
        });
        setTempDataPratical(tempData);
        setTempAllDataPratical(tempData);
        props.setFilterPratical({ establishment: establishmentArray, city: cityArray, participant: participantArray });
    }, [praticalAnswer]);

    useEffect(() => {
        if (props.filterApply) {
            const filter = props.filterApply;
            if (filter.type == "pratico") {
                if (build) filterPratical(filter.establishment, filter.myData, filter.city, filter.participant);
                else setBuild(true);
            }
        }
    }, [props.filterApply]);

    return tempDataPratical ? (
        <TableWrapper>
            <Table>
                <thead>
                    <Tr>
                        <Th>Nomes</Th>
                        <Th>Primeiro passo 1° Indicador</Th>
                        <Th>Primeiro passo 2° Indicador</Th>
                        <Th>Primeiro passo 3° Indicador</Th>
                        <Th>Segundo passo 1° Problema</Th>
                        <Th>Segundo passo 2° Problema</Th>
                        <Th>Segundo passo 3° Problema</Th>
                        <Th>Segundo passo 4° Problema</Th>
                        <Th>Segundo passo 5° Problema</Th>
                        <Th>Terceiro passo</Th>
                        <Th>Quarto passo 1° Ação</Th>
                        <Th>Quarto passo 2° Ação</Th>
                        <Th>Quarto passo 3° Ação</Th>
                        <Th>Quarto passo 4° Ação</Th>
                    </Tr>
                </thead>
                <tbody>
                    {tempDataPratical.map((item, index) => (
                        <Tr key={index}>
                            <Td>
                                {item.dataAnwser.dataUser.split("\n").map((text, index) => (
                                    <React.Fragment key={index}>
                                        {text}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </Td>
                            {Array.from({ length: 3 }, (_, i) => i + 1).map((itemArr, index) => (
                                <Td key={"1" + index}>{item.dataAnwser?.firstStep[index] || "Não informado"}</Td>
                            ))}
                            {Array.from({ length: 5 }, (_, i) => i + 1).map((itemArr, index) => (
                                <Td key={"2" + index}>{item.dataAnwser?.secondStep[index] || "Não informado"}</Td>
                            ))}
                            <Td>{item.dataAnwser?.thirdStep || "Não informado"}</Td>
                            {Array.from({ length: 4 }, (_, i) => i + 1).map((itemArr, index) => (
                                <Td key={"3" + index}>
                                    {item.dataAnwser.fourthStep[index]?.split("\n").map((text, index) => (
                                        <React.Fragment key={index}>
                                            {text}
                                            <br />
                                            <br />
                                        </React.Fragment>
                                    )) || "Não informado"}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </tbody>
            </Table>
        </TableWrapper>
    ) : (
        <></>
    );
}
