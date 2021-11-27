import axios from "axios";
import { useEffect, useState } from "react";
import CreateCommentForm from "./CreateCommentForm";

const Post = ({ title, id }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4001/posts/${id}/comments`).then(res => {
      setComments(res.data);
    });
  }, []);

    return (
      <div>
        <h3>{title}</h3>
        <ul>
          {comments.map(comment => (
            <li key={comment.commentId}>{comment.comment}</li>
          ))}
        </ul>
        <CreateCommentForm id={id} />
      </div>
    );
}

export default Post;