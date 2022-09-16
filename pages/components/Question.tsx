import { Card, CardContent, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import SingleChoice from './answers/SingleChoice';

export default function Question(props: { question: question; handleChange: (event: ChangeEvent<HTMLInputElement>, value: string) => void }) {
  return (
    <Card style={{ marginBottom: 8, backgroundColor: '#6D141A' }}>
      <CardContent style={{ padding: 8 }}>
        <Typography color={'#fff'} fontSize={8} marginBottom={'8px'}>
          {props.question.title}
        </Typography>
        <SingleChoice choices={props.question.choices} onChange={props.handleChange} />
      </CardContent>
    </Card>
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
