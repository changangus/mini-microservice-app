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
  try {
    const { type, data } = req.body;

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
  
    res.send({status: 'OK'});
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});

