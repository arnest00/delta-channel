import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import Button from './common/Button';
import PostForm from './PostForm';
import NowLoading from './NowLoading';

const Replies = ({ replies, categorySlug, isLoading }) => {
  const [ formIsActive, setFormIsActive ] = useState(false);
  const { postId } = useParams();

  const formatReplies = replies => {
    return replies.map(r => (
      <section key={r.postId} className='post-card'>
        <header className='post-header'>
          <h3 className='post-number'>#{r.postId}</h3>
          <div className='post-info-container'>
            <span>Author: {r.author}</span>
            <time dateTime={r.timestamp}>Posted: {formatDate(r.timestamp)}</time>
          </div>
        </header>
        <div className='post-content-container'>
          <pre className='post-content'>{r.postContent}</pre>
        </div>
      </section>
    ));
  };

  const handleCancel = () => {
    setFormIsActive(!formIsActive);
  };

  return (  
    <article id='posts' className={formIsActive ? 'expanded' : ''}>
      <nav id='posts-navigation'>
        <Link to={`/`}>back to categories</Link>
        <Link to={`/${categorySlug}`}>back to topics</Link>
      </nav>
      <h2>replies to {categorySlug}#{postId}</h2>

      <div className="button-container">
        {!formIsActive && <Button onClick={handleCancel} content='Reply to Topic' className='button new-button'/>}
      </div>

      {isLoading && <NowLoading />}
      {formatReplies(replies)}

      {formIsActive && <PostForm 
        formRoute={`${categorySlug}/topic/${postId}`}
        onClick={handleCancel}
        formIsActive={formIsActive}
      />}
    </article>
  );
};
 
export default Replies;