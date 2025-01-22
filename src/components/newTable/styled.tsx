import styled from '@emotion/styled';

export const TableWrapper = styled.div`
  width: 90%;
  overflow-x: auto;
  overflow-y: auto;
  margin: auto;
  border: 1px solid black;
  border-radius: 10px;
  height: 55vh;
  @media (max-width: 768px) {
    height: 60vh
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  table-layout: auto;
`;

export const Th = styled.th`
  padding: 20px;
  border: 1px solid black;
  background-color: #6D141A;
  color: white;
  width: 20vw;
  min-width: 20vw;
  word-break: keep-all;
`;

export const Td = styled.td`
  padding: 10px;
  border: 1px solid black;
  color: black;
`;

export const Tr = styled.tr`
`;