import React, { useEffect, useState } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { FormResultProps } from "./FormResultProps.types";

// Create styles
export const stylesPDF = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  },
  title: {
    color: "#fff",
    fontSize: "20px",
    backgroundColor: "#921c22",
    textAlign: "center",
    padding: 4,
    borderRadius: 8,
  },
  smallTitle: {
    fontSize: "16px",
  },
  points: {
    color: "#52A2F5",
    fontSize: "16px",
    fontWeight: "bold",
  },
  sectionTitle: {
    color: "#52A2F5",
    fontSize: "16px",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  sectionSubtitle: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: "15px 0 5px 0",
  },
  sectionText: {
    color: "#888",
    fontSize: "13px",
  },
  section: {
    margin: 5,
    padding: 5,
  },
  sectionSpacing: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
});

export const ResultFormPdf = ({
  maxScore,
  score,
  domainList,
  answer,
  formTitle,
  date,
}: FormResultProps) => {
  return (
    <Document>
      <Page wrap={false}>
        <View style={stylesPDF.section}>
          <Text style={stylesPDF.title}>{`Resultado ${formTitle} - ${new Date(
            date
          ).toLocaleDateString("pt-br")}`}</Text>{" "}
        </View>
        <View style={stylesPDF.section}>
          <View style={stylesPDF.flex}>
            <Text>Pontuação maxíma:</Text>
            <Text style={stylesPDF.points}>{maxScore} pts</Text>
          </View>
        </View>
        <View style={stylesPDF.section}>
          <View style={stylesPDF.flex}>
            <Text>Pontuação atingida:</Text>
            <Text style={stylesPDF.points}>{score} pts</Text>
          </View>
        </View>
        <View style={stylesPDF.section}>
          <View style={stylesPDF.flex}>
            <Text>Nome do CEO:</Text>
            <Text style={{ maxWidth: "300px", marginLeft: "10px" }}>
              {answer.title}
            </Text>
          </View>
        </View>

        <View style={stylesPDF.section}>
          <View style={stylesPDF.sectionSpacing}>
            {domainList.map((domain) => (
              <View key={domain.cod}>
                <Text style={stylesPDF.sectionTitle}>{domain.name}</Text>
                {domain.questionList.map((question, key) => (
                  <View key={key}>
                    <Text style={stylesPDF.sectionSubtitle}>{question.title}</Text>
                    <Text style={stylesPDF.sectionText}>
                      {question.recommendationMessage}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};
