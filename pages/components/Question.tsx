import { Card, CardContent, colors, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import SingleChoice from './answers/SingleChoice';

export default function Question(props: { questions: question[]; handleChange: (event: ChangeEvent<HTMLInputElement>, value: string) => void }) {
  return (
    <div>
      {props.questions.map((question, index) => (
        <Card key={index} style={{ marginBottom: '24px', backgroundColor: '#6D141A', borderRadius: '16px' }}>
          <CardContent style={{ padding: '16px' }}>
            <Typography style={{ marginBottom: '16px', fontSize: '24px', color: colors.amber[200] }}>
              {index} - {question.title}
            </Typography>
            <SingleChoice choices={question.choices} onChange={props.handleChange} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export type question = {
  formQuestionId: number;
  type: string;
  domain: string;
  title: string;
  choices: string[] | number[];
  // answers: string[] | null;
  score: number;
  childrenQuestion?: question[];
};
