import { Container, HeaderData, SelectWrapper, StyledLegend, StyledOption, StyledSelect, TitleContainer } from "./styled";
import { forms_allowed, version_constants } from "./constants";
import React, {  useState } from "react";
import { INDEX_RES } from "src/services/form/type";
import Table from "@components/table";

export default function Index() {
    const [form, setForm] = useState<INDEX_RES>(forms_allowed[0]);
    const [version, setVersion] = useState<INDEX_RES>(version_constants[0]);
    const [updatedAt, setUpdatedAt] = useState<Date>(new Date());
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const formatDate = (date: Date): string => {
        return new Date(date).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };


    return (
        <Container>
            <HeaderData>
                <SelectWrapper style={{ marginRight: "auto" }}>
                    <StyledLegend $order="L">Formulário</StyledLegend>
                    <StyledSelect
                        name="formulario"
                        value={form.id}
                        onChange={(e) => setForm(forms_allowed.find((v) => v.id == Number(e.currentTarget.value)))}
                    >
                        {forms_allowed.map((v, index) => (
                            <StyledOption key={index} value={v.id}>
                                {v.title}
                            </StyledOption>
                        ))}
                    </StyledSelect>
                </SelectWrapper>
                <TitleContainer suppressHydrationWarning>
                    <h1>{form.title}</h1>
                    <h2 style={{ opacity: isLoading ? "0" : "1" }}>Atualizado em: {formatDate(updatedAt)}</h2>
                </TitleContainer>
                <SelectWrapper>
                    <StyledLegend $order="R">Versão</StyledLegend>
                    <StyledSelect name="versao" value={version.id} onChange={(e) => setVersion(version_constants.find((v) => v.id == e.currentTarget.value))}>
                        {version_constants.map((v, index) => (
                            <StyledOption key={index} value={v.id}>
                                {v.title}
                            </StyledOption>
                        ))}
                    </StyledSelect>
                </SelectWrapper>
            </HeaderData>
            <Table version={version} form={form} setUpdatedAt={setUpdatedAt} isLoading={isLoading} setIsLoading={setIsLoading}></Table>
        </Container>
    );
}
