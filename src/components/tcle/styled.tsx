import { withTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { theme } from "src/core/theme";
import { StyleSheet } from "@react-pdf/renderer";

export const CardContainer = styled.div``;

export const CardTitle = styled.h1`
  font-size: 1.35rem;
  color: ${theme.primaryColor};
  text-align: center;
  font-weight: 700;
  font-family: 'Lora', Georgia, serif;
  margin: 0 0 4px;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 5.5vw;
  }
`;

export const TermsContainer = styled.div`
  box-sizing: border-box;
  margin: 14px 0 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TermsText = styled.div<{ $checked?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 12px;
  cursor: pointer;
  border: 1.5px solid ${props => props.$checked ? 'rgba(109,20,26,0.25)' : '#ebebeb'};
  background-color: ${props => props.$checked ? 'rgba(109,20,26,0.04)' : '#fafafa'};
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background-color: ${props => props.$checked ? theme.primaryColor : 'transparent'};
    border-radius: 12px 0 0 12px;
    transition: background-color 0.2s;
  }

  &:hover {
    border-color: rgba(109,20,26,0.35);
    background-color: rgba(109,20,26,0.06);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(109,20,26,0.1);

    &::before {
      background-color: ${theme.primaryColor};
    }
  }

  @media (max-width: 768px) {
    padding: 10px 12px;
    gap: 10px;
  }
`;

export const TermsButtonContainer = styled.span`
  display: grid;
  column-gap: 10%;
  grid-template-columns: 45% 45%;
  margin-top: 8px;
`;

export const TermsButton = styled.button`
  border-radius: 30px;
  background-color: ${theme.primaryColor};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 12px 0;
  min-height: 44px;
  border: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 200ms, transform 200ms;

  &:hover {
    transform: scaleX(1.03);
    background-color: ${theme.secundaryColor};
  }

  @media (max-width: 768px) {
    font-size: 4vw;
    padding: 10px 0;
  }
`;

export const DocumentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 75vh;
  gap: 12px;
`;

export const DocumentTitle = styled.h2`
  font-size: 1.1vw;
  color: ${theme.primaryColor};
  text-align: center;
  font-weight: 700;
  line-height: 1.4;
  margin: 0;
  padding-bottom: 12px;
  border-bottom: 2px solid ${theme.primaryColor};

  @media (max-width: 768px) {
    font-size: 3.5vw;
  }
`;

export const TermScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  border: 1px solid ${theme.grey};
  border-radius: 10px;
`;

export const DocumentData = styled.div`
  padding: 16px 24px;
  color: black;
  font-size: 0.88rem;
  font-family: 'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.7;

  * {
    color: black;
  }

  ul {
    padding-left: 1.5em;
    margin: 0.5em 0;
  }

  li {
    margin-bottom: 0.5em;
    line-height: 1.6;
    font-size: 0.88rem;
  }
`;

export const DocumentSignatureContainer = styled.div`
  display: grid;
  margin: 30px 0;
  grid-template-columns: 100%;
  row-gap: 10%;
`;
