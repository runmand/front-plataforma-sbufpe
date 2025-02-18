import styled from "@emotion/styled";
import { StyleSheet } from "@react-pdf/renderer";
import { theme } from "src/core/theme";

export const TaleContainer = styled.div`
  display: grid;
  width: 80%;
  margin: 5vh auto;
  grid-template-columns: 15% 80%;
  column-gap: 5%;

  & > p {
    margin: auto;
  }
`;

export const TaleImage = styled.img`
  width: 100%;
  height: 100%;
`;

// Paragraphy Document
export const PD = styled.p`
  font-size: 1vw;
  text-indent: 2vw;

  @media (max-width: 768px) {
    font-size: 4vw;
  }
`;

export const PDInput = styled.input`
  background-color: transparent;
  border: 0;
  border-bottom: 1px solid black;
  border-radius: 0;
  width: 21vw;
  margin-left: 0vw;
  margin-right: 0;
  height: 1vw;

  &::placeholder {
    color: ${theme.grey};
  }

  @media (max-width: 768px) {
    font-size: 4vw;
    height: 4vw;
  }
`;

export const DocumentParagraphyTitle = styled.h5`
  text-align: center;
  width: 100%;
  margin: 1vw 0;
  & > b {
    font-weight: bolder;

    &::after {
      content: "\\A";
      white-space: pre;
    }
  }
`;

export const DocumentLi = styled.li`
  list-style: none;
  position: relative;
  padding-left: 1.5em;

  &::before {
    content: "⮚";
    position: absolute;
    left: 0;
    width: 12px;
    height: 12px;
    background-image: url("/path-para-seu-icone.svg");
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

export const pdfStyles = StyleSheet.create({
  Title: {
    textAlign: "center",
    width: "100%",
    marginTop: "1vw",
    marginBottom: "1vw",
  },
  TitleBolder: {
    textAlign: "center",
    width: "100%",
    marginTop: "3vw",
    marginBottom: "3vw",
    fontWeight: "bold",
  },
  Paragraph: {
    textIndent: "2vw",
    fontSize: "2vw",
    textAlign: "left",
  },
  view: {
    padding: "6%",
  },
  TALEU: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
    marginBottom: "5%",
    marginTop: "5%",
  },
  Paragraph2: { width: "70%" },
  Invisible: { width: "20%", marginRight: "10%", height: "60%" },
  Image: { width: "20%", marginRight: "10%", height: "60%" },
});
