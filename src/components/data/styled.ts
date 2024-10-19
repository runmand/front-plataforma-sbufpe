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
`;

export const ButtonContainer = styled.div`
  background-color: #6D141A;
  padding: 1%;
  border-radius: 10px;
  display: flex;
  margin-right: auto;
`;

export const Title = styled.h1`
  color: black;
  text-align: center;
  margin: auto;
`;

export const UpdateContainer = styled.div`
  background-color: #6D141A;
  padding: 1%;
  margin: auto;
  border-radius: 10px;
  margin-left: auto;
`;

export const UpdateInfo = styled.div`
  background-color: #921c22;
  padding: 1%;
  margin-left: auto;
  margin-right: 0px;
  display: flex;
  flex-wrap: nowrap;
`;

