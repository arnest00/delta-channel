import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetch from 'node-fetch';

const PostForm = ({ onCancel, formRoute }) => {
  const [ formContent, setFormContent ] = useState({ postAuthor: 'Anonymous', postContent: '' });
  const [ postDisabled, setPostDisabled ] = useState(true);
  let history = useHistory();
  
  const handleInputChange = e => {
    const postAuthor = e.target.value;

    setFormContent({ ...formContent, postAuthor });
  };

  const handleTextareaChange = e => {
    const postContent = e.target.value;

    if (postContent.length >= 15) setPostDisabled(false);
    setFormContent({ ...formContent, postContent });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!formContent.postAuthor.length) setFormContent({ ...formContent, postAuthor: 'Anonymous' });

    fetch(`/api/${formRoute}`, {
      method: 'POST',
      body: JSON.stringify(formContent),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (res.ok) {
          onCancel();
          history.push(`/${formRoute}/success`);
        };
      })
      .catch(err => console.log(err));
  };

  return ( 
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name 
          <input 
            type='text'
            name='post-author'
            placeholder='Anonymous'
            onChange={handleInputChange}
          ></input>
        </label>
      </div>

      <div>
        <label>
          Content
          <textarea 
            name='post-content'
            rows='6'
            minLength='15'
            maxLength='750'
            onChange={handleTextareaChange}
          ></textarea>
        </label>
      </div>

      <button 
        type='submit' 
        disabled={postDisabled}
      >
        Post
      </button>

      <button
        type='button'
        onClick={onCancel}
      >
        Cancel
      </button>
    </form>
  );
};
 
export default PostForm;