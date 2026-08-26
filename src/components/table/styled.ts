import styled from "@emotion/styled";

/* mesmas famílias usadas no menu, no rodapé e nas demais páginas */
const fontDisplay = "'Newsreader', Georgia, 'Times New Roman', serif";
const fontBody = "'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif";

export const Container = styled.div`
    width: 100%;
    min-width: 0;
    max-width: 100%;
    min-height: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
`;

export const TableWrapperOuter = styled.div`
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    min-height: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    border: 1px solid #f3f4f6;
    background: #ffffff;
    overflow: hidden;
`;

export const Toolbar = styled.div`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    padding: 12px 20px;
    border-bottom: 1px solid #f3f4f6;

    @media (max-height: 820px) {
        padding: 8px 16px;
    }
`;

export const ToolbarInfo = styled.p`
    margin: 0;
    font-family: ${fontBody};
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: #6b7280;

    strong {
        color: #111827;
        font-weight: 700;
    }
`;

export const ToolbarActions = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const ActionButton = styled.button<{ $variant?: "solid" | "outline" }>`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    padding: 0 16px;
    border-radius: 8px;
    font-family: ${fontBody};
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;

    border: 1px solid ${({ $variant }) => ($variant === "solid" ? "#6d141a" : "#e5e7eb")};
    background: ${({ $variant }) => ($variant === "solid" ? "#6d141a" : "#ffffff")};
    color: ${({ $variant }) => ($variant === "solid" ? "#ffffff" : "#6d141a")};

    &:hover:not(:disabled) {
        background: ${({ $variant }) => ($variant === "solid" ? "#841a1a" : "#faf7f2")};
        border-color: ${({ $variant }) => ($variant === "solid" ? "#841a1a" : "#d6cec2")};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    @media (max-height: 820px) {
        height: 34px;
        padding: 0 12px;
    }

    @media (max-width: 600px) {
        span {
            display: none;
        }

        padding: 0 12px;
    }
`;

export const TableWrapper = styled.div`
    width: 100%;
    max-width: 100%;
    /* ocupa toda a altura que sobra do card, sem depender de valor fixo */
    flex: 1;
    min-height: 180px;
    overflow: auto;
    overscroll-behavior-x: contain;

    /* Firefox */
    scrollbar-width: auto;
    scrollbar-color: #6d141a #f1ece6;

    &::-webkit-scrollbar {
        width: 16px;
        height: 16px;
    }

    &::-webkit-scrollbar-track {
        background: #f1ece6;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #6d141a;
        border-radius: 10px;
        /* borda transparente: alvo de clique de 16px com aparência de 10px */
        border: 3px solid transparent;
        background-clip: padding-box;
        min-height: 56px;
    }

    &::-webkit-scrollbar-thumb:horizontal {
        min-width: 56px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #841a1a;
    }

    &::-webkit-scrollbar-thumb:active {
        background-color: #5a1015;
    }

    &::-webkit-scrollbar-corner {
        background: #f1ece6;
    }

    thead {
        position: sticky;
        top: 0;
        z-index: 1;
    }
`;

export const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-family: ${fontBody};
    font-size: 14px;
    line-height: 20px;
`;

export const THead = styled.thead`
    background-color: #6d141a;
    color: #ffffff;

    th {
        padding: 12px 16px;
        text-align: left;
        font-weight: 600;
        vertical-align: middle;
        background-color: #6d141a;
        border-right: 1px solid #841a1a;
        width: 340px;
        min-width: 300px;
        max-width: 420px;
        white-space: normal;

        &:last-child {
            border-right: none;
        }

        @media (max-height: 820px) {
            padding: 8px 12px;
        }
    }
`;

export const TBody = styled.tbody`
    tr {
        border-top: 1px solid #f3f4f6;
        transition: background-color 0.15s ease;

        &:nth-of-type(even) {
            background-color: #faf7f2;
        }

        &:hover {
            background-color: #f7edee;
        }
    }

    td {
        padding: 12px 16px;
        color: #1c1917;
        border-right: 1px solid #f3f4f6;
        width: 340px;
        min-width: 300px;
        max-width: 420px;
        vertical-align: top;

        &:last-child {
            border-right: none;
        }

        @media (max-height: 820px) {
            padding: 8px 12px;
        }
    }
`;

export const ThDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`;

export const TitleTHead = styled.p`
    margin: 0;
    min-width: 0;
    color: #ffffff;
    text-align: left;
    font-family: ${fontBody};
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;

    /* teto de 3 linhas: mantém a altura do cabeçalho fixa,
       independente do tamanho da pergunta */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    overflow: hidden;
    overflow-wrap: anywhere;
`;

export const CellText = styled.span`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    line-clamp: 5;
    overflow: hidden;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
`;

export const NoData = styled.div`
    box-sizing: border-box;
    width: 100%;
    flex: 1;
    min-height: 180px;
    padding: 40px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    h1 {
        margin: 0 0 6px;
        font-family: ${fontDisplay};
        font-weight: 400;
        font-size: 24px;
        line-height: 30px;
        color: #111827;
        background: transparent;
    }

    p {
        margin: 0;
        font-family: ${fontBody};
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
        color: #6b7280;
    }
`;
