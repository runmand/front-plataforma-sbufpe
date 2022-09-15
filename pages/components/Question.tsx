import { Card, CardContent, Typography } from '@mui/material';
import SingleChoice from './answers/SingleChoice';

export default function Question(props: { question: question; handleOnClick: (index: number) => void }) {
  return (
    <Card style={{ margin: 16, backgroundColor: '#6D141A' }}>
      <CardContent>
        <Typography color={'#fff'} fontSize={10}>
          {props.question.title}
        </Typography>
        <SingleChoice choices={props.question.choices} onClick={(index: number) => props.handleOnClick(index)} />
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
  score: number;
  childrenQuestion?: question[];
};
