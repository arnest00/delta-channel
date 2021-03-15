import React from 'react';

const PostForm = ({ onClick }) => {
  return ( 
    <React.Fragment>
      <form action=''>
        <label htmlFor='post-input'>Reply to the last post</label>

        <textarea 
          id='post-input'
          name='post-input'
          rows='6'
          minLength='15'
          maxLength='750'
        ></textarea>

        <button 
          type='submit'
          onClick={onClick}
        >
          Post
        </button>
      </form>
    </React.Fragment>
  );
}
 
export default PostForm;