import { planAnswer, PROPS } from "@components/data/type";
import React, { useEffect, useState } from "react";
import { TableWrapper, Td, Th, Tr } from "../styled";
import { Table } from "@mui/material";
import { capitalizeFirstLetter, filterBy, removeDuplicates } from "../functions";

export default function Index(props: PROPS) {
    const { planAnswer, praticalAnswer } = props;
    const [formattedDataTeoric, setFormattedDataTeoric] = useState<planAnswer[][]>([]);
    const [allFormattedDataTeoric, setAllFormattedDataTeoric] = useState<planAnswer[][]>([]);
    const [build, setBuild] = useState<boolean>(false);

    function filterTeoric(establishment: string, city: string, participant: string, mydata: boolean) {
        if (establishment == "*" && city == "*" && participant == "*" && mydata == false) {
            setFormattedDataTeoric(allFormattedDataTeoric);
        } else {
            const newData: planAnswer[][] = [];
            allFormattedDataTeoric.forEach((element) => {
                const myId = Number(localStorage.getItem("userId"));

                if (mydata) {
                    if (element[0].userId != myId) {
                        return;
                    }
                }

                if (
                    filterBy(element[0].answer, establishment, "estabelecimento") &&
                    filterBy(element[0].answer, city, "cidade") &&
                    filterBy(element[0].answer, participant, "profissional")
                ) {
                    newData.push(element);
                }
            });

            setFormattedDataTeoric(newData);
        }
    }

    useEffect(() => {
        const dataFinal: planAnswer[][] = [];
        const cityArray: string[] = [];
        const establishmentArray: string[] = [];
        const participantArray: string[] = [];
        planAnswer.forEach((element) => {
            let result: planAnswer[] = [];
            let newData: planAnswer = {
                id: 0,
                createdAt: null,
                deletedAt: null,
                userId: null,
                questionId: null,
                typeUser: "",
                title: null,
                answer: "",
            };
            element.forEach((data) => {
                if (data.questionId == 9) {
                    const answer = data.answer == "" ? "Não informado" : data.answer;
                    newData = {
                        id: data.id,
                        createdAt: data.createdAt,
                        deletedAt: data.createdAt,
                        userId: data.userId,
                        questionId: data.questionId,
                        title: "Usuario respondente",
                        typeUser: data.typeUser,
                        answer: newData.answer + data.title + ": " + answer + "\n",
                    };

                    if (data.title == "Nome") {
                        newData.answer += "Profissional: " + data.typeUser;
                        participantArray.push(data.typeUser);
                    }

                    if (data.title == "Estabelecimento") establishmentArray.push(capitalizeFirstLetter(answer));

                    if (data.title == "Cidade") cityArray.push(capitalizeFirstLetter(answer));
                } else {
                    if (newData != null) {
                        result.push(newData);
                        newData = null;
                    }
                    result.push(data);
                }
            });

            dataFinal.push(result);
        });

        setFormattedDataTeoric(dataFinal);
        setAllFormattedDataTeoric(dataFinal);

        props.setFilterTeoric({
            establishment: removeDuplicates(establishmentArray),
            city: removeDuplicates(cityArray),
            participant: removeDuplicates(participantArray),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [praticalAnswer]);

    useEffect(() => {
        if (props.filterApply) {
            const filter = props.filterApply;
            if (filter.type == "teorico") {
                if (build) filterTeoric(filter.establishment, filter.city, filter.participant, filter.myData);
                else setBuild(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.filterApply]);

    return planAnswer != undefined && allFormattedDataTeoric[0] != null ? (
        <TableWrapper>
            <Table>
                <thead>
                    <Tr>
                        {allFormattedDataTeoric[0].map((item, index) => (
                            <React.Fragment key={index}>
                                {item.questionId !== 9 ? (
                                    <Th>{item.title}</Th>
                                ) : (
                                    <Th>
                                        {item.title} {item.titleJustify}
                                    </Th>
                                )}
                            </React.Fragment>
                        ))}
                    </Tr>
                </thead>
                <tbody attr-b={Date.now()}>
                    {formattedDataTeoric.map((item, index) => (
                        <Tr key={index}>
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
                                        <Td key={element.id}>
                                            {element.answer}, {element.justify}
                                        </Td>
                                    )}
                                </React.Fragment>
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
