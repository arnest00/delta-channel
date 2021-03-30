import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetch from 'node-fetch';

const PostForm = ({ onCancel, formRoute }) => {
  const [ formContent, setFormContent ] = useState({ postAuthor: 'Anonymous', postContent: '' });
  let history = useHistory();
  
  const handleInputChange = e => {
    setFormContent({ ...formContent, postAuthor: e.target.value });
  };

  const handleTextareaChange = e => {
    setFormContent({ ...formContent, postContent: e.target.value });
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