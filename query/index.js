import express, { json } from 'express';
import cors from 'cors';

const app = express();

app.use(json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  console.log(posts);
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  console.log(req.body);
  switch (type) {
    case 'CommentCreated':
      const { commentId, postId, comment } = data;
      const newComment = { commentId, comment, postId };
      console.log('in comments:', posts)
      posts[postId].comments.push(newComment);
    case 'PostCreated':
      const { id, title } = data;
      const post = { id, title, comments: [] };
      posts[id] = post;
      console.log('in posts:', posts)
    default: 
      break; 
  }
  console.log('1:', posts);
  res.send({status: 'OK'});
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});

