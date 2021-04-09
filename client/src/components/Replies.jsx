import React from 'react';
import { Link, useParams } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import PostForm from './PostForm';
import NowLoading from './NowLoading';

const Replies = ({ replies, categorySlug, isLoading }) => {
  const { postId } = useParams();

  const formatReplies = replies => {
    return replies.map(r => (
      <section key={r.postId}>
        <header>
          <div>
            <h3>#{r.postId}</h3>
          </div>
          <div>
            <span>{r.author}</span>
            <time dateTime={r.timestamp}>{formatDate(r.timestamp)}</time>
          </div>
        </header>
        <pre>{r.postContent}</pre>
      </section>
    ));
  };

  return (  
    <article>
      <nav id='replies-navigation'>
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