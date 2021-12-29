import express, { json } from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();

app.use(json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === 'CommentUpdated') {
    const { commentId, postId, status, comment } = data;
    const comments = posts[postId].comments;
    const commentToUpdate = comments.find(comment => comment.commentId === commentId);
    commentToUpdate.status = status;
    commentToUpdate.comment = comment;
  }

  if (type === 'CommentCreated') {
    const { commentId, postId, comment, status } = data;
    const newComment = { commentId, comment, postId, status };
    posts[postId].comments.push(newComment);
  }
      
  if (type === 'PostCreated') {
    const { id, title } = data;
    const post = { id, title, comments: [] };
    posts[id] = post;
  }
}; 

app.get('/posts', (req, res) => {
  console.log(posts);
  res.send(posts);
});

app.post('/events', (req, res) => {
  try {
    const { type, data } = req.body;
    handleEvent(type, data);
    res.send({status: 'OK'});
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(4002, async () => {
  console.log('Listening on 4002');

  const res = await axios.get('http://localhost:4005/events');

  res.data.forEach((event) => {
    console.log('handling event', event);
    
    handleEvent(event.type, event.data);
  });
});

