import styled from "@emotion/styled";

const fontBody = "'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif";

/* Gatilho no formato de campo — mesma caixa dos selects da página */
export const FieldTrigger = styled.button<{ $open: boolean }>`
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    height: 46px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 14px;
    font-family: ${fontBody};
    font-weight: 400;
    font-size: 15px;
    line-height: 16px;
    text-align: left;
    color: #111827;
    background-color: #ffffff;
    border: 1px solid ${({ $open }) => ($open ? "#841a1a" : "#e5e7eb")};
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    transition: border-color 0.2s;

    &:focus-visible {
        border-color: #841a1a;
    }

    span {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    svg {
        flex-shrink: 0;
        transition: transform 0.15s ease;
        transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
    }

    @media (max-height: 820px) {
        height: 38px;
        font-size: 14px;
        padding: 0 12px;
    }
`;

/* Gatilho compacto usado no cabeçalho da tabela */
export const IconTrigger = styled.button<{ $active: boolean; $open: boolean }>`
    box-sizing: border-box;
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border-radius: 6px;
    cursor: pointer;
    color: #ffffff;
    border: 1px solid ${({ $active, $open }) => ($active || $open ? "#ffffff" : "rgba(255, 255, 255, 0.35)")};
    background: ${({ $active, $open }) => ($active || $open ? "rgba(255, 255, 255, 0.22)" : "transparent")};
    transition: background-color 0.15s ease, border-color 0.15s ease;

    &:hover,
    &:focus-visible {
        background: rgba(255, 255, 255, 0.22);
        border-color: #ffffff;
        outline: none;
    }
`;

export const Menu = styled.div`
    position: fixed;
    z-index: 1400;
    box-sizing: border-box;
    padding: 6px;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    background: #ffffff;
    box-shadow: 0 12px 32px rgba(17, 24, 39, 0.16);
    overflow-y: auto;
    overscroll-behavior: contain;

    scrollbar-width: thin;
    scrollbar-color: #6d141a #f1ece6;

    &::-webkit-scrollbar {
        width: 12px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #6d141a;
        border-radius: 8px;
        border: 3px solid transparent;
        background-clip: padding-box;
        min-height: 40px;
    }
`;

export const MenuOption = styled.div<{ $selected: boolean; $highlighted: boolean }>`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border-radius: 6px;
    cursor: pointer;
    font-family: ${fontBody};
    font-size: 14px;
    line-height: 20px;
    font-weight: ${({ $selected }) => ($selected ? 600 : 400)};
    color: ${({ $selected }) => ($selected ? "#6d141a" : "#1c1917")};
    background: ${({ $highlighted }) => ($highlighted ? "#faf7f2" : "transparent")};

    span {
        flex: 1;
        min-width: 0;
        overflow-wrap: anywhere;
    }

    svg {
        flex-shrink: 0;
        opacity: ${({ $selected }) => ($selected ? 1 : 0)};
    }
`;
