import { ChoiceAll, QuestionAll, QuestionResponse } from "src/core/typePlaneja";
import { Box, Typography } from "@mui/material";
import { ReactElement } from "react";
import { PlanejaQuestion } from "./index";

function createTextType1(text: string): string[] {
  const array = text.split("**");

  return array;
}

export function createQuestionType1(question: QuestionAll): JSX.Element {
  const text = createTextType1(question.question.text);
  return (
    <Box>
      <Typography
        sx={{
          margin: "auto",
          paddingBottom: "2rem",
          fontWeight: "bold",
        }}
      >
        {text[0]}
      </Typography>
      <Typography
        sx={{
          textAlign: "justify",
        }}
      >
        {text[1]}
      </Typography>
      <PlanejaQuestion
        id={1}
        title={question.question.title}
        yesDescr={question.choices[0].JustifyChoice.title}
        noDescr={question.choices[1].JustifyChoice.title}
        noHasJustify={true}
      />
      <Typography
        sx={{
          textAlign: "justify",
        }}
      >
        {text[2]}
      </Typography>
    </Box>
  );
}

export const escapeRegExp = (text: string): string => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const extractTextBetweenTags = (
  text: string,
  startTag: string,
  endTag: string
): string[] | null => {
  const regex = new RegExp(
    `${escapeRegExp(startTag)}([\\s\\S]*?)${escapeRegExp(endTag)}`
  );
  const match = regex.exec(text);
  const contentBetweenTags = match ? match[1] : null;

  if (contentBetweenTags) {
    return contentBetweenTags.split("**");
  } else {
    return null;
  }
};

export const extractHeader = (text: string): string => {
  const regex = /_h_(.*?)_h_/;
  const match = regex.exec(text);
  return match ? match[1] : "";
};
