import styled from '@emotion/styled';
import { Box, IconButton } from '@mui/material';

export const MainContainer = styled(Box)`
  margin-top: 12vh;
  width: 100%;
  height: 85vh;
  display: flex;
  flex-wrap: wrap;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 30% 40% 30%;
  height: 5vh;
  margin: auto;
  margin-bottom: 10vh;
  margin-top: 2.5vh;
  width: 90vw;
  @media (max-width: 768px) {
    grid-template-columns: 100%;
    grid-template-areas: "Type"
    "Update"
    "title";
    row-gap: 10px;
  }
`;

export const ButtonContainer = styled.div`
  background-color: #6D141A;
  padding: 1%;
  border-radius: 10px;
  display: flex;
  margin-right: auto;
  @media (max-width: 768px) {
    grid-area: Type;
    padding: 0 1%;
    & > * {
    font-size: 10px;
    height: 90%
    }
  }
`;

export const Title = styled.h1`
  color: black;
  text-align: center;
  margin: auto;
  @media (max-width: 768px) {
    grid-area: title;
    font-size: 25px;
  }
`;

export const UpdateContainer = styled.div`
  background-color: #6D141A;
  padding: 1%;
  margin: auto;
  border-radius: 10px;
  margin-left: auto;
  @media (max-width: 768px) {
    grid-area: Update;
    width: 90%;
    & > * {
      font-size: 15px;
      height: 90%
    }
  }
`;

export const UpdateInfo = styled.div`
  background-color: #921c22;
  padding: 1%;
  margin-left: auto;
  margin-right: 0px;
  display: flex;
  flex-wrap: nowrap;
`;


export const DivLoad = styled.div`
width: 100vw;
height: 20vh;
display: grid;
align-items: 'center',
`
