import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import React, { ChangeEvent } from 'react';
import QuestionCard, { Question } from '../Question';

export default function Form() {
  const [form, setForm] = React.useState<FormState>({ title: '', questions: [] });
  const handleChange = (event: ChangeEvent<HTMLInputElement>, value: string) => console.log(value);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('clicou em enviar');
  };

  React.useEffect(() => {
    axios.get(`${process.env.API_URL}/form-registers/2`).then((res) => setForm(res.data.data));
  }, []);

  if (form.questions.length) {
    return (
      <form onSubmit={handleSubmit}>
        <Card style={{ backgroundColor: '#5a0f14' }}>
          <CardContent>
            <Typography
              style={{
                backgroundColor: '#777',
                borderRadius: '16px',
                textAlign: 'center',
                color: '#000',
                fontSize: '48px',
                fontWeight: 'bold',
                marginBottom: '16px',
                padding: '16px',
              }}
            >
              {form.title}
            </Typography>
            <QuestionCard questions={form.questions} handleChange={handleChange} />
          </CardContent>
          <CardActions style={{ justifyContent: 'end', padding: '16px' }}>
            <Button type="submit" variant="contained">
              ENVIAR
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  }
}

type FormState = {
  title: string;
  questions: Question[];
};
