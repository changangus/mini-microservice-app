import axios from 'axios';
import { useState } from 'react';
import './CreatePostForm.css';

const CreatePostForm = () => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const post = { title };
        const newPost = await axios.post('http://localhost:4000/posts', post);
        console.log(newPost);
        setTitle('');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                </div>
                <button type="submit" className="btn">Submit</button>
            </form>
        </div>
    );
}

export default CreatePostForm;