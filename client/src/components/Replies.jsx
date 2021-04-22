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
          <span>Author: {r.author}</span>
        </header>
        <div className='post-content-container'>
          <pre className='post-content'>{r.postContent}</pre>
        </div>
        <div className="post-footer">
          <time dateTime={r.timestamp}>Posted: {formatDate(r.timestamp)}</time>
        </div>
      </section>
    ));
  };

  const handleCancel = () => {
    setFormIsActive(!formIsActive);
  };

  return ( 
    <div id='main'>
      <article id='posts' className={formIsActive ? 'expanded' : ''}>
        <nav id='posts-navigation' className='mobile'>
          <Link to={`/`}>back to categories</Link>
          <Link to={`/${categorySlug}`}>back to topics</Link>
        </nav>

        <h2>replies to {categorySlug}#{postId}</h2>

        <div className="button-container mobile">
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

      <section id='sidebar'>
        <nav id='posts-navigation'>
          <Link to={`/`}>back to categories</Link>
          <Link to={`/${categorySlug}`}>back to topics</Link>
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
  );
};
 
export default Replies;