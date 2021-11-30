import express, { json } from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  const postId = req.params.id;
  res.send(commentsByPostId[postId] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { comment } = req.body;
  const postId = req.params.id;
  const comments = commentsByPostId[postId] || [];
  commentsByPostId[postId] = [...comments, { commentId, comment }];

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      commentId,
      comment,
      postId,
    },
  });

  res.status(201).send(commentsByPostId[postId]);
});

app.listen(4001, () => {
  console.log('Listening on port 4001');
});
