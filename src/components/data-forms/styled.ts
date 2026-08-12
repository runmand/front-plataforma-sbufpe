import styled from '@emotion/styled';
import { theme } from 'src/core/theme';


export const Container = styled.div`
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 10vh 10vh 68vh;
    padding: 0 2.5%;
    padding-top: 15vh;
    padding-bottom: 10vh;
    align-items: center;
`;

export const Form = styled.div`
    width: 95%;
    height: 10vh;
    margin: auto;
`;
export const Filter = styled.div`
    width: 95%;
    height: 10vh;
    margin: auto;
    display: grid;
    grid-template-columns: 47.5% 47.5%;
    column-gap: 5%;
`;

export const ButtonExportData = styled.button`
    width: fit-content;
    margin: auto;
    padding: 0.5%;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    background-color: #921c22;
    color: white;
    right: 1vw;
    bottom: 1vw;
    border-radius: 50%;
    transition: 500ms;
    &:hover {
        box-shadow: 0px 0px 30px 0px rgba(184, 35, 45, 0.6);
        background-color: #6d141a;
        padding: 0.6%;

    }
`;

export const TableWrapper = styled.div`
    width: 90vw;
    height: 70vh;
    overflow: auto;
    border: 1px solid gray;
    margin: auto;
`; 

export const Table = styled.table`
    width: 100%;
    overflow-y: auto;
    overflow-x: auto;
    border-collapse: collapse;
`;

export const THead = styled.thead`
    background-color: ${theme.primaryColor};
      position: sticky;

`;

export const TRow = styled.tr`
    font-size: 20px;
    white-space: nowrap;
    background-color: ${theme.primaryColor};
    border: 1px solid ${theme.secundaryColor};
`;

export const TheadLine = styled.th`
  max-width: 10vw;
  overflow-x: hidden;
  cursor: pointer;
  padding: 10px;
  transition: 500ms;
  border: 3px solid ${theme.secundaryColor};
  position: sticky;
  top: 0;
  background-color: ${theme.primaryColor};
  z-index: 10;

  @media (max-width: 768px) {
    max-width: 100vw;
  }

  &:hover {
    max-width: 100vw;
  }
`;

export const TBody = styled.tbody``;


export const TR = styled.tr`
    color: black;
        background-color: #ffff;

    &:nth-child(even) {
        background-color: #dddddd;
    }
`;


export const TD = styled.td`
    max-width: 10vw;
    overflow-x: hidden;
    cursor: pointer;
    padding: 10px;
    border: 3px solid #ffff;
`;

export const Loading = styled.div`
    display: flex;
    width: 90vw;
    height: 70vh;
    margin: auto;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0;
    flex-direction: column;

    & > p{
        width: 100%;
        text-align: center;
        margin-top: 2vh;
    }
`;

