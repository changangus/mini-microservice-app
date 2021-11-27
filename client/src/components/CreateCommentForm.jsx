import axios from "axios";
import { useState } from "react";

const CreateCommentForm = ({ id }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = { comment };
    const newCommentPost = await axios.post(`http://localhost:4001/posts/${id}/comments`, newComment);
    console.log(newCommentPost);
    setComment('');
  }
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="comment">Comment</label>
            <input 
              type="text" 
              className="form-control" 
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)} />
          </div>
          <button type="submit" className="btn">Submit</button>
        </form>
      </div>
    );
}

export default CreateCommentForm;