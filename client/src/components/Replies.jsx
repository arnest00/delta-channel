import React from 'react';
import { Link, useParams } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import PostForm from './PostForm';
import NowLoading from './NowLoading';

const Replies = ({ replies, categorySlug, isLoading }) => {
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

  return (  
    <article id='posts'>
      <nav id='posts-navigation'>
        <Link to={`/`}>back to categories</Link>
        <Link to={`/${categorySlug}`}>back to topics</Link>
      </nav>
      <h2>replies to {categorySlug}#{postId}</h2>

      <PostForm 
        formAction='Reply to Topic'
        formRoute={`${categorySlug}/topic/${postId}`}
      />

      {isLoading && <NowLoading />}
      {formatReplies(replies)}
    </article>
  );
};
 
export default Replies;