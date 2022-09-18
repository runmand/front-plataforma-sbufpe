import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import React, { ChangeEvent } from 'react';
import Question from '../Question';
import { IForm } from './store';

export default function Form() {
  const [form, setForm] = React.useState<IForm>(IForm);
  const handleChange = (event: ChangeEvent<HTMLInputElement>, value: string) => console.log(value);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('clicou em enviar');
  };

  React.useEffect(() => {
    axios.get('http://localhost:2000/form-registers/2').then((res) => setForm(res.data.data));
  }, []);

  if (form.questions.length) {
    return (
      <form onSubmit={handleSubmit}>
        <Card style={{ backgroundColor: '#5a0f14' }}>
          <Card style={{ backgroundColor: '#777', margin: '16px', borderRadius: '16px' }}>
            <CardContent>
              <Typography style={{ textAlign: 'center', color: '#000', fontSize: '48px', fontWeight: 'bold' }}>{form.title}</Typography>
            </CardContent>
          </Card>

          <CardContent>
            <Question questions={form.questions} handleChange={handleChange} />
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </form>
    );
  }
}
