import React, { useState } from 'react';
import fetch from 'node-fetch';

const PostForm = () => {
  const [ postContent, setPostContent ] = useState({ postContent: '' });

  const handleChange = e => {
    setPostContent({ postContent: e.target.value })
  };

  const handleSubmit = e => {
    e.preventDefault();

    fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(postContent),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.redirect('/'))
      .catch(err => console.log(err));
  };

  return ( 
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Reply to the last post
          <textarea 
            name='post-content'
            rows='6'
            minLength='15'
            maxLength='750'
            onChange={handleChange}
          ></textarea>
        </label>
      </div>

      <button 
        type='submit'
      >
        Post
      </button>
    </form>
  );
};
 
export default PostForm;