import styled from "@emotion/styled";

/* mesmas famílias usadas no menu, no rodapé e nas demais páginas */
const fontDisplay = "'Newsreader', Georgia, 'Times New Roman', serif";
const fontBody = "'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif";

export const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    /* altura definida (descontando o rodapé) para a rolagem acontecer dentro da tabela,
       e não na página inteira; min-height evita esmagar em telas muito baixas */
    height: calc(100vh - 44px);
    height: calc(100dvh - 44px);
    min-height: 520px;
    overflow-x: hidden;
    background: #faf7f2;
    padding: 92px 24px 24px;
    display: flex;

    /* telas baixas: o cabeçalho fixo e as bordas cedem espaço para a tabela */
    @media (max-height: 820px) {
        padding: 80px 20px 16px;
    }

    @media (max-width: 768px) {
        padding: 84px 16px 16px;
    }

    @media (max-width: 640px) {
        height: calc(100vh - 96px);
        height: calc(100dvh - 96px);
    }
`;

export const Content = styled.div`
    width: 100%;
    max-width: 1400px;
    min-width: 0;
    min-height: 0;
    flex: 1;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media (max-height: 820px) {
        gap: 12px;
    }
`;

export const HeaderData = styled.div`
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr) minmax(0, 1fr);
    align-items: end;
    gap: 20px;
    padding: 16px 24px;
    border-radius: 12px;
    border: 1px solid #f3f4f6;
    background: #ffffff;

    @media (max-height: 820px) {
        gap: 14px;
        padding: 10px 16px;
    }

    @media (max-width: 1024px) {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: 12px;
        padding: 12px 16px;
    }

    @media (max-width: 600px) {
        grid-template-columns: minmax(0, 1fr);
        gap: 10px;
    }
`;

export const TitleContainer = styled.div`
    grid-column: 2;
    grid-row: 1;
    min-width: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;

    h1 {
        margin: 0;
        font-family: ${fontDisplay};
        font-weight: 700;
        font-size: 24px;
        line-height: 30px;
        color: #111827;
        overflow-wrap: break-word;
        background: transparent;
    }

    h2 {
        margin: 0;
        font-family: ${fontBody};
        font-size: 13px;
        line-height: 18px;
        font-weight: 400;
        color: #6b7280;
        transition: opacity 0.2s ease;
    }

    @media (max-height: 820px) {
        gap: 2px;

        h1 {
            font-size: 20px;
            line-height: 25px;
        }

        h2 {
            font-size: 12px;
            line-height: 16px;
        }
    }

    @media (max-width: 1024px) {
        grid-column: 1 / -1;
        grid-row: 1;
        justify-content: center;

        h1 {
            font-size: 22px;
            line-height: 28px;
        }
    }
`;

export const SelectWrapper = styled.div<{ $order: "L" | "R" }>`
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;

    @media (max-height: 820px) {
        gap: 2px;
    }
    grid-row: 1;
    grid-column: ${({ $order }) => ($order === "L" ? 1 : 3)};

    @media (max-width: 1024px) {
        grid-row: 2;
        grid-column: ${({ $order }) => ($order === "L" ? 1 : 2)};
    }

    @media (max-width: 600px) {
        grid-column: 1;
        grid-row: ${({ $order }) => ($order === "L" ? 2 : 3)};
    }
`;

/* mesma caixa de campo do formulário da página de Contato, na fonte de UI do sistema */
export const StyledLegend = styled.label`
    display: block;
    font-family: ${fontBody};
    font-weight: 400;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: 0px;
    color: #374151;

    @media (max-height: 820px) {
        font-size: 12px;
        line-height: 16px;
    }
`;
