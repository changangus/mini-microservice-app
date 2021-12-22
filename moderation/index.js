import express, { json } from 'express';
import axios from 'axios';

const app = express();

app.use(json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  if (type === 'CommentCreated') { 
    const { comment, commentId, postId } = data;

    const status = comment.includes('orange') ? 'rejected' : 'approved';

    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        commentId,
        postId,
        comment,
        status     
      }
    });
  }
});


app.listen(4003, () => {
  console.log('Listening on 4003');
});
