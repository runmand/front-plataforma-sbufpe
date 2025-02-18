import { withTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { theme } from "src/core/theme";
import { StyleSheet } from "@react-pdf/renderer";

export const CardContainer = styled.div``;

export const CardTitle = styled.h1`
  font-size: 2.5vw;
  color: ${theme.primaryColor};
  text-align: center;

  @media (max-width: 768px) {
    font-size: 8vw;
  }
`;

export const TermsContainer = styled.div`
  padding: 2% 2%;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid gray;
  margin: 2vh 0 5vh 0;
`;

export const TermsText = styled.p`
  font-weight: bolder;
  color: ${theme.black};
  font-size: 1vw;
  margin: 3vh 0 3vh 0;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 3vw;
  }
`;

export const TermsButtonContainer = styled.span`
  display: grid;
  column-gap: 10%;
  grid-template-columns: 45% 45%;
`;

export const TermsButton = styled.button`
  border-radius: 30px;
  background-color: ${theme.primaryColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5vw;
  padding: 3% 0;
  border: 0;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  cursor: pointer;
  transition: 300ms;

  &:hover {
    transform: scaleX(1.05);
    background-color: ${theme.secundaryColor};
  }

  @media (max-width: 768px) {
    font-size: 4vw;
  }
`;

export const DocumentContainer = styled.div`
  height: 80vh;
`;

export const DocumentTitle = styled.h1`
  font-size: 1.5vw;
  color: ${theme.primaryColor};
  text-align: center;

  @media (max-width: 768px) {
    font-size: 4vw;
  }
`;

export const DocumentData = styled.div`
  color: black;

  border: 1px solid ${theme.grey};
  padding: 1%;
  border-radius: 15px;
  height: 86%;
  overflow-y: auto;
  * {
    color: black;
  }
`;

export const DocumentSignatureContainer = styled.div`
  display: grid;
  margin: 30px 0;
  grid-template-columns: 100%;
  row-gap: 10%;
`;
