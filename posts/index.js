import express, { json } from 'express';
import axios from 'axios';
import { randomBytes } from 'crypto';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());


// This is storing posts in memory:
const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const title = req.body.title;

  posts[id] = { id, title };

  await axios.post('http://event-bus-srv:4005/events', { 
    type: 'PostCreated', 
    data: { id, title }
  });

  res.status(201).send(posts[id]);
});

app.post('/events', async (req, res) => {
  console.log('Event Received: ', req.body);

  res.send({ status: 'OK' });
});

app.listen(4000, () => {
  console.log('listening on port 4000');
});

