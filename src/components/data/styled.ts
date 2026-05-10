import styled from "@emotion/styled";

export const Container = styled.div`
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 10vh 66.6vh;
    padding: 0 2.5%;
    align-items: center;
    padding-top: 12vh;

      @media (max-width: 768px) {
    grid-template-rows: 18vh 66.6vh;

  }

`;
export const HeaderData = styled.div`
    display: flex;
    height: 100%;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;
    padding: 0 15px;

    @media (max-width: 768px) {
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: 50% 50%;
        gap: 15px;
  }
`;

export const TitleContainer = styled.div`
    color: black;
    width: fit-content;
    position: absolute;
    text-align: center;
    z-index: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    padding: 0 5%;
    top: 5px;
    border-radius: 10px;

    h2 {
        font-size: 12px;
        color: #6b1a1a;
        font-weight: bold;
    }

@media (max-width: 1366px) {
position: relative;
margin: auto
    
}

      @media (max-width: 768px) {
        position: relative;
        grid-row-start: 0;
        grid-row-end: 1;

        grid-column-start: 1;
        grid-column-end: 3;
        font-size: 12px;
        padding: 2%
  }
`;

export const SelectWrapper = styled.fieldset`
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 0 12px;
    margin: 0;
    width: fit-content;
    background-color: #6b1a1a;
    z-index: 12;

    &:hover {
        background-color: #7d2020;
        legend {
            background-color: #7d2020;
        }
    }

    &:focus {
        background-color: #7d2020;
        box-shadow: 0 0 0 2px rgba(107, 26, 26, 0.4);
    }

    cursor: pointer;
`;
export const StyledLegend = styled.legend<{ $order: "L" | "C" | "R" }>`
    font-size: 14px;
    color: #fff;
    padding: 0 5px;
    width: fit-content;
    font-weight: bold;
    background-color: #6b1a1a;
    border-radius: 5px;

    margin-left: ${({ $order }) => ($order === "L" ? "0" : $order === "C" ? "auto" : "auto")};

    margin-right: ${({ $order }) => ($order === "R" ? "0" : $order === "C" ? "auto" : "auto")};
`;
export const StyledSelect = styled.select`
    background-color: transparent;
    appearance: none;
    -webkit-appearance: none;
    color: #ffffff;
    border: none;
    padding: 8px 36px 8px 12px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    outline: none;
    height: fit-content;
    width: 100%;
    margin-left: auto;

    /* Seta customizada no mesmo estilo */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;

    transition: background-color 0.15s ease;
`;
export const StyledOption = styled.option`
    background-color: #8b2a2a;
    color: #6b1a1a;
    color: #ffffff;
    &:checked,
    &:focus,
    &:hover {
        background-color: #8b2a2a;
        color: #ffffff;
        font-weight: bolder;
    }
`;
