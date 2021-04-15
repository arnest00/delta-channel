import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetch from 'node-fetch';
import Button from './common/Button';

const PostForm = ({ formAction, formRoute }) => {
  const [ formContent, setFormContent ] = useState({ postAuthor: 'Anonymous', postContent: '' });
  const [ formIsActive, setFormIsActive ] = useState(false);
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

  const handleSubmit = e => {
    e.preventDefault();
    if (formContent.postContent.length < 15) return setError('Posts must be at least 15 characters long.');
    if (formContent.postContent.length > 750) return setError('Posts must be at most 750 characters long.');
    if (!formContent.postAuthor.length) setFormContent({ ...formContent, postAuthor: 'Anonymous' });

    fetch(`/api/${formRoute}`, {
      method: 'POST', 
      body: JSON.stringify(formContent), 
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (res.ok) {
          setFormIsActive(false);
          history.push(`/${formRoute}/success`);
        };
      })
      .catch(err => console.log(err));
  };

  const handleCancel = () => {
    setFormIsActive(!formIsActive);
  };

  return ( 
    <div id='form-container'>
      {!formIsActive && <Button onClick={handleCancel} content={formAction} id='new-button'/>}

      {formIsActive && <form onSubmit={handleSubmit}>
        <div>
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
        
        <div>
          <label>
            Content:
            <textarea 
              name='post-content'
              rows='6'
              onChange={handleTextareaChange}
            ></textarea>
          </label>
          { error && <span>{error}</span>}
        </div>

        <Button content={'Post'} type='submit' disabled={postDisabled} />
        <Button onClick={handleCancel} content={'Cancel'} />
      </form>}
    </div>
  );
};
 
export default PostForm;