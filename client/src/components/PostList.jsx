import axios from "axios";
import { useEffect, useState } from "react";
import Post from "./Post";

const PostList = () => {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    axios.get("http://localhost:4002/posts").then(res => {
      console.log(res.data);
      Object.keys(res.data).length > 0 ? setPosts(res.data) : setPosts({});
    });
  }, []);

  return (
      <div className="post-list">
          {Object.values(posts).map(post => (
              <Post key={post.id} id={post.id} title={post.title} comments={post.comments} />
          ))}
      </div>
  );
}

export default PostList;