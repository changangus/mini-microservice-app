import express, { json } from 'express';
import axios from 'axios';

const app = express();
app.use(json());

app.post('/events', async (req, res) => {
  const event = req.body;
  try {
    await axios.post('http://localhost:4000/events', event);
    await axios.post('http://localhost:4001/events', event);  
    await axios.post('http://localhost:4002/events', event);
    
    res.send({ status: 'OK' });
  } catch (error) {
    console.log(error);
  }
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});