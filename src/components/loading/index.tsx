import React, { CSSProperties } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const spin = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
`;

const Overlay = styled.div<{ sx: CSSProperties }>`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 12px;
    ${({ sx }) => ({ ...sx })}
`;

const Spinner = styled.div<{ sx: CSSProperties }>`
    width: 40px;
    height: 40px;
    border: 4px solid #e8d0d0;
    border-top-color: #6b1a1a;
    border-radius: 100%;
    animation: ${spin} 0.8s linear infinite;
    ${({ sx }) => ({ ...sx })}
`;

const Label = styled.p<{ $fontSize: string; sx: CSSProperties }>`
    font-size: ${({ $fontSize }) => $fontSize};
    color: #6b1a1a;
    font-weight: 600;
    margin: 0;
    ${({ sx }) => ({ ...sx })}
`;

interface LoadingProps {
    label?: string;
    sx?: CSSProperties;
    sxSpinner?: CSSProperties;
    sxLabel?: CSSProperties;
    fontSize?: string;
}

export default function Loading({ label = "Carregando...", sx, fontSize = "14px", sxSpinner, sxLabel }: LoadingProps) {
    return (
        <Overlay sx={sx}>
            <Spinner sx={sxSpinner} />
            <Label $fontSize={fontSize} sx={sxLabel}>
                {label}
            </Label>
        </Overlay>
    );
}
