import CreatePostForm from "./components/CreatePostForm";
import PostList from "./components/PostList";
import './App.css';

const App = () => {
  return (
    <div className="main-container">
      <h1>Create Post</h1>
      <CreatePostForm />
      <div>
        <h1>Posts</h1>
        <PostList />
      </div>
    </div>
  );
};

export default App;