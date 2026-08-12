import { Box, LinearProgress, Typography } from "@mui/material";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

type Props = {
    steps: string[];
    upSteps: number;
};

export default function Index(prop: Props) {
    const [value, setValue] = useState(0);
    const [lengthLinear, setLengthLinear] = useState(0);
    const [steps] = useState<string[]>(["..", ...prop.steps, "Finalizado"]);

    function upValue() {
        const length = prop.steps.length;

        if (value < length) {
            setValue((o) => o + 1);
            setLengthLinear(() => ((value + 1) * 100) / length);
        }
    }


    const setUpValue = useCallback(() => {
        const length = prop.steps.length;
        if (prop.upSteps < length) {
            setValue(() => prop.upSteps);
            setLengthLinear(() => ((prop.upSteps + 1) * 100) / length);
        }
    }, [prop.steps.length, prop.upSteps])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        setUpValue();
    }, [prop.upSteps, setUpValue]);

    return (
        <Box>
            <Image width={400} height={400} src={"/gif/sending-mail.gif"} alt="" />
            <Typography variant="h1" fontSize={40} sx={{ textAlign: "center" }} color="#6D141A">
                {steps[value]}
            </Typography>
            <LinearProgress color="error" sx={{ width: "100%" }} variant="determinate" value={lengthLinear} />
        </Box>
    );
}
