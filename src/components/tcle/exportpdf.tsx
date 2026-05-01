import { Page, pdf, View, Document, Text, Image } from "@react-pdf/renderer";
import { pdfStyles } from "./tcle-document/styled";
import { Styles } from "@react-pdf/renderer";
import { MutableRefObject } from "react";

type typeStyles = {
  text: string;
  style: string;
  img?: string;
};

function replaceInputForValue(node: Element, myArray: typeStyles[]) {
  const input = Array.from(node.getElementsByTagName("input"));

  input.forEach((element) => {
    if (node.tagName == "H5") {
      myArray.push({
        text: element.value,
        style: "h4",
      });
    } else {
      const textNode = document.createElement("span");
      textNode.textContent = element.value || "[Campo vazio]";
      element.parentNode.replaceChild(textNode, element);
    }
  });
}

export function renderNodes(nodes: HTMLCollection) {
  const myArray: typeStyles[] = [];

  Array.from(nodes).map(async (node, index) => {
    replaceInputForValue(node, myArray);
    if (node.tagName == "H5") {
      myArray.push({ text: node.textContent, style: "h4" });
    } else if (node.tagName == "BUTTON") {
    } else if (node.tagName == "DIV") {
      const item: typeStyles = {
        text: "",
        style: "div",
        img: "",
      };

      if (node.children[1].tagName == "P") {
        const p = node.children[1] as HTMLParagraphElement;
        item.text = p.textContent;
      }
      if (node.children[0].tagName == "IMG") {
        const img = node.children[0] as HTMLImageElement;
        item.img = img.src;
      }

      myArray.push(item);
    } else if (node.tagName == "UL") {
      Array.from(node.children).map((item, index) => {
        myArray.push({ text: item.textContent, style: "p" });
      });
    } else if (node.tagName == "P") {
      myArray.push({ text: node.textContent, style: "p" });
    }
  });

  return myArray;
}

export async function generatePDF(nodes: HTMLCollection) {
  let r: typeStyles[] = [];
  r = renderNodes(nodes);

  const PDF = () => {
    return (
      <Document>
        <Page size={"A4"}>
          <View style={pdfStyles.view}>
            {r.map((item, index) => {
              if (item.style == "div") {
                return (
                  <View key={index} style={pdfStyles.TALEU}>
                    {item.img ? (
                      // eslint-disable-next-line jsx-a11y/alt-text
                      <Image src={item.img} style={pdfStyles.Image} />
                    ) : (
                      <Text style={pdfStyles.Invisible}></Text>
                    )}
                    <Text style={pdfStyles.Paragraph2}>{item.text}</Text>
                  </View>
                );
              } else {
                let style;
                switch (item.style) {
                  case "h4":
                    style = pdfStyles.Title;
                    break;
                  case "p":
                  default:
                    style = pdfStyles.Paragraph;
                }
                return (
                  <Text key={index} style={style}>
                    {item.text}
                  </Text>
                );
              }
            })}
          </View>
        </Page>
      </Document>
    );
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const blob = await pdf(<PDF />).toBlob();

  const response = await blobToBase64(blob);

  return response;

  // // Create a URL for the blob object
  // const url = URL.createObjectURL(blob);
  // // Create an anchor element and set its href to the PDF URL
  // const a = document.createElement("a");
  // a.href = url;
  // a.download = `Resposta do planeja`;
  // a.click();
}
