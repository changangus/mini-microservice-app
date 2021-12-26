import CreateCommentForm from "./CreateCommentForm";

const Post = ({ title, id, comments = [] }) => {
    return (
      <div>
        <h3>{title}</h3>
        <ul>
          {comments.map(comment => {
            switch (comment.status) {
              case "pending":
                return <li key={comment.id}>Comment is awaiting moderation</li>;
              case "approved":
                return <li key={comment.id}>{comment.comment}</li>;
              case "rejected":
                return <li key={comment.id}>Comment has been rejected</li>;
              default:
                return <li key={comment.id}>{comment.comment}</li>;
            }
          })}
        </ul>
        <CreateCommentForm id={id} />
      </div>
    );
}

export default Post;