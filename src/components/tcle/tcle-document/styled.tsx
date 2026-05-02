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
  font-size: 0.88rem;
  font-family: 'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif;
  text-indent: 1.5em;
  line-height: 1.7;
  margin: 0.6em 0;
  text-align: justify;

  @media (max-width: 768px) {
    font-size: 3.5vw;
  }
`;

export const PDInput = styled.input`
  background-color: transparent;
  border: 0;
  border-bottom: 1.5px solid #555;
  border-radius: 0;
  width: 18vw;
  height: 1.4em;
  font-size: inherit;
  font-family: 'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif;
  vertical-align: middle;
  padding: 0 2px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-bottom-color: ${theme.primaryColor};
  }

  &::placeholder {
    color: ${theme.grey};
    font-style: italic;
    font-size: 0.85em;
  }

  @media (max-width: 768px) {
    width: 40vw;
    font-size: 3.5vw;
  }
`;

export const DocumentParagraphyTitle = styled.h5`
  text-align: center;
  width: 100%;
  font-size: 0.85rem;
  font-family: 'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  margin: 1em 0 0.4em;
  line-height: 1.5;

  & > b {
    font-weight: 700;
    display: block;
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
