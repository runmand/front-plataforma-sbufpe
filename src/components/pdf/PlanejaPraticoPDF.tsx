import { IStepsValues } from '@components/planeja-pratico/steps/FinishFormStep';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";

const stylesPDF = StyleSheet.create({
  page: { padding: 30 },
  section: { margin: 10, padding: 10, flexGrow: 1 },
  flex: { display: "flex", flexDirection: "row" },
  title: { fontSize: 16, fontWeight: "bold" },
  subtitle: { fontSize: 14, fontWeight: "bold", marginTop: 10 },
  text: { fontSize: 12, marginTop: 5 },
});

const ModifiedPdfPlanejaPratico = ({ stepValues }: { stepValues: IStepsValues }) => {
  return (
  <Document>
    <Page style={stylesPDF.page}>
      {/* First Step */}
      <View style={stylesPDF.section}>
        <Text style={stylesPDF.title}>Primeira Etapa</Text>
        {stepValues.firstStep.map((item, index) => (
          <View key={index}>
            <Text style={stylesPDF.subtitle}>Domínio: {item.domain}</Text>
            <Text style={stylesPDF.text}>
              Primeiro Indicador: {item.first_indicator}
            </Text>
            <Text style={stylesPDF.text}>
              Grau do Primeiro Indicador: {item.first_degree}
            </Text>
            <Text style={stylesPDF.text}>
              Segundo Indicador: {item.second_indicator}
            </Text>
            <Text style={stylesPDF.text}>
              Grau do Segundo Indicador: {item.second_degree}
            </Text>
          </View>
        ))}
      </View>

      {/* Second Step */}
      <View style={stylesPDF.section}>
        <Text style={stylesPDF.title}>Segunda Etapa</Text>
        {stepValues.secondStep.defined_problems.map((problem, index) => (
          <View key={index}>
            <Text style={stylesPDF.subtitle}>
              Problema Definido {problem.id}
            </Text>
            <Text style={stylesPDF.text}>{problem.answer}</Text>
          </View>
        ))}
      </View>

      <View style={stylesPDF.section}>
        <Text style={stylesPDF.title}>Terceira Etapa</Text>
        {stepValues.thirdStep.causas.map((causa, index) => (
          <View key={index}>
            <Text style={stylesPDF.subtitle}>Causa {causa.id}</Text>
            <Text style={stylesPDF.text}>{causa.causa}</Text>
            <Text style={stylesPDF.text}>{causa.explicacao}</Text>
          </View>
        ))}
      </View>

      {/* Third Step */}
      <View style={stylesPDF.section}>
        <Text style={stylesPDF.title}>Terceira Etapa</Text>

        <Text style={stylesPDF.text}>
          Nó Crítico: {stepValues.fourthStep.criticalNode}
        </Text>
        {stepValues.fourthStep.actions.map((action, index) => (
          <View key={index}>
            <Text style={stylesPDF.subtitle}>Ação: {action.name}</Text>
            <Text style={stylesPDF.text}>
              Prazo: {action.deadline_compliance}
            </Text>
            <Text style={stylesPDF.text}>Responsáveis:</Text>
            {action.responsibles.map((responsible, i) => (
              <View key={i}>
                <Text style={stylesPDF.text}>
                  Responsável: {responsible.responsible}
                </Text>
                <Text style={stylesPDF.text}>
                  Motivação: {responsible.motivation}
                </Text>
                <Text style={stylesPDF.text}>
                  Estratégias: {responsible.strategies}
                </Text>
              </View>
            ))}
            <Text style={stylesPDF.text}>Recursos:</Text>
            {action.resources.map((resource, i) => (
              <View key={i}>
                <Text style={stylesPDF.text}>
                  Recurso: {resource.resource}
                </Text>
                <Text style={stylesPDF.text}>
                  É Recurso Crítico: {resource.itsCricticalResource}
                </Text>
                <Text style={stylesPDF.text}>
                  Estratégias Descritas: {resource.described_strategies}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </Page>
  </Document>
  )
};

export default ModifiedPdfPlanejaPratico;

export async function downloadPdfPlanejaPratico(stepValues: IStepsValues) {
  const blob = await pdf(<ModifiedPdfPlanejaPratico stepValues={stepValues}  />).toBlob();

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `relatorio_${new Date().toLocaleDateString()}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
