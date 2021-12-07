import CreateCommentForm from "./CreateCommentForm";

const Post = ({ title, id, comments = [] }) => {
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