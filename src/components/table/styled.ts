import styled from "@emotion/styled";

export const Container = styled.div`
    width: 99%;
    justify-content: baseline;
    margin-left: 0.5%;
    height: 90%;
    max-height: 90%;
    overflow: hidden;
    display: flex;
`;
export const TableWrapperOuter = styled.div`
    width: 100%;
    max-width: 100%;
    height: 100%;
    border-radius: 8px;
    border: 1px solid #6b1a1a;
    overflow: hidden;
`;
export const TableWrapper = styled.div`
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow: auto;

    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-track {
        background: #fdf5f5;
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #6b1a1a;
        border-radius: 4px;
        border: 2px solid #fdf5f5;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #8b2a2a;
    }

    ::-webkit-scrollbar-corner {
        background: #fdf5f5;
    }

    thead {
        position: sticky;
        top: 0;
        z-index: 1;
    }

    td:first-child,
    th:first-child {
        left: 0;
        z-index: 2;
        background-color: #6b1a1a;
        color: #fff;
    }

    td:first-child {
        background-color: #fdf5f5;
        color: #2a2a2a;
    }

    tr:nth-child(even) td:first-child {
        background-color: #f5e0e0;
    }

    tr:hover td:first-child {
        background-color: #f5e0e0;
    }
`;
export const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
`;
export const THead = styled.thead`
    background-color: #6b1a1a;
    color: #ffffff;

    th {
        padding: 8px 16px;
        text-align: left;
        font-weight: 600;
        letter-spacing: 0.03em;
        border-right: 1px solid #7d2020;
        vertical-align: middle;
        white-space: nowrap;

        &:last-child {
            border-right: none;
        }
    }
`;
export const TBody = styled.tbody`
    tr {
        border-bottom: 1px solid #e8d0d0;
        transition: background-color 0.15s ease;

        &:nth-child(even) {
            background-color: #fdf5f5;
        }

        &:hover {
            background-color: #f5e0e0;
        }

        &:last-child {
            border-bottom: none;
        }
    }

    td {
        padding: 10px 16px;
        color: #2a2a2a;
        border-right: 1px solid #7d2020;
        white-space: pre-wrap;

        &:last-child {
            border-right: none;
        }
    }
`;
export const ThDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const TitleTHead = styled.p`
    color: #ffffff;
    text-align: left;
    font-weight: 600;
    letter-spacing: 0.03em;
`;
export const StyledSelect = styled.select`
    background-color: transparent;
    appearance: none;
    -webkit-appearance: none;
    color: transparent;
    border: none;
    padding: 24px 32px 8px 12px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    outline: none;
    height: fit-content;
    width: 100%;
    margin-left: auto;
    font-size: 0px;
    margin-left: 10px;

    width: fit-content;
    font-weight: bold;
    background-color: #6b1a1a;
    border-radius: 5px;

    &:hover {
        background-color: #8b2a2a;
    }

    /* Seta customizada no mesmo estilo */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23ffffff' viewBox='0 0 16 16'%3E%3Cpath d='M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 50% center;

    transition: background-color 0.15s ease;
`;
export const StyledOption = styled.option`
    background-color: #8b2a2a;
    color: #6b1a1a;
    color: #ffffff;
    font-size: 12px;

    &:checked,
    &:focus,
    &:hover {
        background-color: #8b2a2a;
        color: #ffffff;
        font-weight: bolder;
    }
`;

export const LeftBar = styled.div`
    width: fit-content;
    height: 66.6vh;
    padding: 1.9% 0;
    margin-left: auto;
    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: end;
    position: fixed;
    right: 16px;
    top: 18vh;
    z-index: 300;
    max-width: 110px;
    gap: 10px;
`;

export const OptionLeftBar = styled.div`
    background-color: #6b1a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    height: fit-content;
    transition: 300ms;
    width: fit-content;
    padding: 1.5px;
    border-radius: 10px;
    cursor: pointer;

    width: 36px;
    height: 36px;
    min-width: 36px;
    min-height: 36px;

    & > h2 {
        font-size: 0px;
        margin: auto;
    }

    &:hover {
        width: 110px;
        right: 18px;

        & > h2 {
            font-size: 16px;
        }
    }
`;
