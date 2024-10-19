import { planAnswer, PROPS } from '@components/data/type';
import React from "react";
import styled from '@emotion/styled';

const TableWrapper = styled.div`
  width: 90%;
  overflow-x: auto;
  overflow-y: auto;
  margin: auto;
  border: 1px solid black;
  border-radius: 10px;
  height: 80vh;
  max-height: 70vh;
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

export default function Index(props: PROPS) {
  const { planAnswer } = props;

  return (
    (planAnswer[0] ?
    <TableWrapper>
      <Table>
        <thead>
        <Tr>
            {planAnswer[0].map((item, index) => (
              <React.Fragment key={item.questionId+index}>
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
            <Tr key={1}>
              {item.map((element) => (
                <React.Fragment key={element.questionId+index}>
                  {element.questionId == 9 ? (
                    <Td key={element.questionId}>{element.answer}</Td>
                     ) : (
                      <><Td key={element.id}>{element.answer}</Td>
                      <Td key={element.id+.1}>{element.justify}</Td></>)}
                </React.Fragment> 
      
              ))}
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>: <></>)
  );
}
