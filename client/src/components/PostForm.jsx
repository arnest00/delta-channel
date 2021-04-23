import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetch from 'node-fetch';
import Button from './common/Button';

const PostForm = ({ formRoute, onClick, formIsActive }) => {
  const [ formContent, setFormContent ] = useState({ postAuthor: 'Anonymous', postContent: '' });
  const [ postDisabled, setPostDisabled ] = useState(true);
  const [ error, setError ] = useState(null);
  let history = useHistory();

  useEffect(() => {
    if (formContent.postContent.length >= 15 && formContent.postContent.length <= 750) setPostDisabled(false);
    else setPostDisabled(true);
  }, [ formContent.postContent ]);
  
  const handleInputChange = e => {
    const postAuthor = e.target.value;

    setFormContent({ ...formContent, postAuthor });
  };

  const handleTextareaChange = e => {
    const postContent = e.target.value;

    setFormContent({ ...formContent, postContent });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (formContent.postContent.length < 15) return setError('Posts must be at least 15 characters long.');
    if (formContent.postContent.length > 750) return setError('Posts must be at most 750 characters long.');
    if (!formContent.postAuthor.length) setFormContent({ ...formContent, postAuthor: 'Anonymous' });

    try {
      await fetch(`/api/${formRoute}`, {
        method: 'POST', 
        body: JSON.stringify(formContent), 
        headers: { 'Content-Type': 'application/json' }
      });

      history.push(`/${formRoute}/success`);
    } catch (e) {
      history.push(`/${formRoute}/failure`);
    };
  };

  return ( 
    <div className='form-container mobile'>

      {formIsActive && <form onSubmit={handleSubmit} className='form'>
        <div className="form-group">
          <div className='input-group'>
            <label>
              Name:
              <input 
                type='text'
                name='post-author'
                placeholder='Anonymous'
                onChange={handleInputChange}
              ></input>
            </label>
          </div>
          
          <div className='input-group'>
            <label>
              Content:
              <textarea 
                name='post-content'
                rows='6'
                autoFocus
                onChange={handleTextareaChange}
              ></textarea>
            </label>
            { error && <span>{error}</span>}
          </div>
        </div>

        <div className='button-group'>
          <Button onClick={onClick} content={'Cancel'} className='button cancel-button' />
          <Button content={'Post'} type='submit' disabled={postDisabled} className='button post-button' />
        </div>
      </form>}
    </div>
  );
};
 
export default PostForm;