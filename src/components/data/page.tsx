import { Container, Content, HeaderData, SelectWrapper, StyledLegend, TitleContainer } from "./styled";
import { forms_allowed, version_constants } from "./constants";
import React, { useState } from "react";
import { INDEX_RES } from "src/modules/form/type";
import Table from "@components/table";
import Dropdown from "@components/dropdown";

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
            <Content>
                <HeaderData>
                    <SelectWrapper $order="L">
                        <StyledLegend as="span" id="label-formulario">
                            Formulário
                        </StyledLegend>
                        <Dropdown
                            id="formulario"
                            label="Formulário"
                            value={String(form.id)}
                            options={forms_allowed.map((v) => ({ value: String(v.id), label: v.title }))}
                            onChange={(value) => setForm(forms_allowed.find((v) => String(v.id) === value))}
                        />
                    </SelectWrapper>
                    <TitleContainer suppressHydrationWarning>
                        <h1>{form.title}</h1>
                        <h2 style={{ opacity: isLoading ? "0" : "1" }}>Atualizado em: {formatDate(updatedAt)}</h2>
                    </TitleContainer>
                    <SelectWrapper $order="R">
                        <StyledLegend as="span" id="label-versao">
                            Versão
                        </StyledLegend>
                        <Dropdown
                            id="versao"
                            label="Versão"
                            align="right"
                            value={String(version.id)}
                            options={version_constants.map((v) => ({ value: String(v.id), label: v.title }))}
                            onChange={(value) => setVersion(version_constants.find((v) => String(v.id) === value))}
                        />
                    </SelectWrapper>
                </HeaderData>
                <Table version={version} form={form} setUpdatedAt={setUpdatedAt} isLoading={isLoading} setIsLoading={setIsLoading}></Table>
            </Content>
        </Container>
    );
}
