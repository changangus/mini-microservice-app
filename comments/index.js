import express, { json } from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  const postId = req.params.id;
  res.send(commentsByPostId[postId] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { comment } = req.body;
  const postId = req.params.id;
  const comments = commentsByPostId[postId] || [];
  commentsByPostId[postId] = [...comments, { commentId, comment }];
  res.status(201).send(commentsByPostId[postId]);
});

app.listen(4001, () => {
  console.log('Listening on port 4001');
});
