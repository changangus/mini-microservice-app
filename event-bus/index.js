import express, { json } from 'express';
import axios from 'axios';

const app = express();
app.use(json());

const events = [];

app.post('/events', async (req, res) => {
  const event = req.body;
  events.push(event);

  try {
    await axios.post('http://posts-srv-cip:4000/events', event);
    await axios.post('http://comments-srv:4001/events', event);  
    await axios.post('http://query-srv:4002/events', event);
    await axios.post('http://moderation-srv:4003/events', event);
    
    return res.send({ status: 'OK' });
  } catch (error) {
    console.log(error);
  }
});

app.get('/events', (req, res) => {
  return res.send(events);
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});
