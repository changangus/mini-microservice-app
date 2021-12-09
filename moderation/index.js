import express, { json } from 'express';
import axios from 'axios';

const app = express();

app.use(json());

app.post('/events', (req, res) => {
  const { type, data} = req.body;
  if (type === 'CommentModerated') { 
    
  }
});

app.listen(4003, () => {
  console.log('Listening on 4003');
});
