import { LinearProgress } from "@mui/material";
import React from "react";

interface Props {
  totalQuestions: number;
  answeredQuestions: number;
}

export const ProgressBarAnswer = ({
  totalQuestions,
  answeredQuestions,
}: Props) => {
  const calculatePercentage = (): number => {
    if (totalQuestions <= 0) return 0;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  const percentageCompleted = calculatePercentage();
  console.log(percentageCompleted);
  return <LinearProgress variant="determinate" value={percentageCompleted} />;
};
