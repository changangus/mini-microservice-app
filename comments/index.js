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
  commentsByPostId[postId] = [...comments, { commentId, comment, status: 'pending' }];

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      commentId,
      comment,
      postId,
      status: 'pending',
    },
  });

  res.status(201).send(commentsByPostId[postId]);
});

app.post('/events', async (req, res) => {
  console.log('Event Received: ', req.body);

  const { type, data } = req.body;

  if(type === 'CommentModerated') {
    const { status, postId, commentId, comment } = data;
    const comments = commentsByPostId[postId];
    comments.find(comment => comment.commentId === commentId).status = status;

    await axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data: {
        commentId,
        postId,
        status,
        comment,
      }
    });
  }

  res.send({ status: 'OK' });
});

app.listen(4001, () => {
  console.log('Listening on port 4001');
});
