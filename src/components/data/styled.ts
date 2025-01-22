import styled from '@emotion/styled';
import { Box, IconButton } from '@mui/material';

export const MainContainer = styled(Box)`
  margin-top: 12vh;
  margin-bottom: 12vh;
  width: 100%;
  height: 85vh;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 30% 40% 30%;
  height: 9vh;
  margin: auto;
  margin-top: 2.5vh;
  width: 90vw;
  @media (max-width: 768px) {
    grid-template-columns: 100%;
    grid-template-areas: 
    "Type"
    "Update"
    "title";
    row-gap: 10px;
    height: 22vh;
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
  padding: .5%;
  box-sizing: border-box;
  border-radius: 20px;
  margin: 2vh auto;
  min-width: 40vw;
  max-width:60vw;
  height: 12vh;
  display: flex;
  @media (max-width: 768px) {
    grid-area: Update;
    width: 95vw;
    height: 20vh;
    max-width:95vw;
    padding: 1%;
    & > * {
      font-size: 15px;
      height: 90%
    }
  }
`;

export const UpdateInfo = styled.div`
  background-color: #921c22;
  width: 100%;
  margin-left: auto;
  margin-right: 0px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  @media (max-width: 768px) {
    width: 96%;
    height: 96%;
    display: grid;
    margin: auto;
    grid-template-columns: 40% 40%;
    grid-template-areas: 'establishment city' 'professional my';
  }
`;


export const DivLoad = styled.div`
width: 100vw;
height: 20vh;
display: grid;
align-items: 'center',
`

export const ReloadContainer = styled.div`
  width: 80%;
  background-color: #6D141A;
  padding: 1%;
  box-sizing: border-box;
  border-radius: 20px;
  display: flex;
  margin: auto;
`

export const Reload = styled.div`
  background-color: #921c22;
  padding: 2%;
  border-radius: 20px;
  height: 100%;
  width: 100%;
  display: grid;
  min-height: 48px;
  grid-template-columns: 80% 20%
`

export const ReloadTitle = styled.p`
  background-color: transparent;
  color: #ffff;
  font-size: 1.15rem;
  background-color: transparent;
  height: fit-content;
  margin: auto;
`

export const ReloadButton= styled.div`
  height: 100%;
  aspect-ratio: 1 / 1;
  background-color: #6d141a;
  color: white;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.65);
  transition: 500ms;
  & > *{
    transition: 500ms;

  }
  &:hover {
    background-color: #6d141a;
    transform: scale(1.1);
    cursor: pointer;
    & > * {
      transform: rotate(180deg)
    }
  }`