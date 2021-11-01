import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from './common/Button';
import PostForm from './PostForm';
import Post from './Post';
import Status from './Status';

const Replies = ({ history, pathname, categorySlug }) => {
  const [ content, setContent ] = useState([]);
  const [ status, setStatus ] = useState(undefined);
  const [ update, setUpdate ] = useState({});
  const [ formIsActive, setFormIsActive ] = useState(false);
  const { postId } = useParams();

  useEffect(() => {
    const fetchContent = async () => {
      
      try {
        setStatus('loading');
        const response = await fetch(`/api${pathname}`);
        const data = await response.json();

        if (isActive) {
          setContent(data);
          setStatus(undefined);
        };
      } catch (e) {
        history.replace('/not-found');
      };
    };
    let isActive = true;

    if (!pathname.includes('success') && !pathname.includes('failure')) fetchContent();

    return function cleanup() {
      isActive = false;
    };
  }, [ pathname, history, update ]);

  const formatReplies = replies => {
    return replies.map(r => (
      <Post 
        post={r} 
        key={r.postId} 
        categorySlug={categorySlug} 
        isTopic={false} 
      />
    ));
  };

  const handleCancel = () => {
    setFormIsActive(!formIsActive);
  };

  const handleUpdate = () => {
    setUpdate({});
  };

  return ( 
    <article className='Posts container'>
      <div className='posts-container'>
        <section className={`content${formIsActive ? ' expanded' : ''}`}>
          <h2>replies to {categorySlug}#{postId}</h2>

          <div className="button-container mobile">
            {!formIsActive && <Button onClick={handleCancel} content='Reply to Topic' className='button new-button'/>}
          </div>
          {formIsActive && <PostForm 
            formRoute={`${categorySlug}/topic/${postId}`}
            onClick={handleCancel}
            formIsActive={formIsActive}
          />}

          {formatReplies(content)}
          {<Status 
            currentStatus={status}
          />}

          <nav className='posts-navigation mobile'>
            <Link to='/'>back to categories</Link>
            <Link to={`/${categorySlug}`}>back to topics</Link>
            <Button
              onClick={handleUpdate}
              content='update replies'
              className='update-link'
            />
          </nav>
        </section>
        
        <section className='sidebar'>
          <nav className='posts-navigation'>
            <Link to={`/`}>back to categories</Link>
            <Link to={`/${categorySlug}`}>back to topics</Link>
            <Button
              onClick={handleUpdate}
              content='update replies'
              className='update-link'
            />
          </nav>
          <div className="button-container">
            {!formIsActive && <Button onClick={handleCancel} content='Reply to Topic' className='button new-button'/>}
          </div>
          {formIsActive && <PostForm 
            formRoute={`${categorySlug}/topic/${postId}`}
            onClick={handleCancel}
            formIsActive={formIsActive}
          />}
        </section>
      </div>
    </article>
  );
};
 
export default Replies;