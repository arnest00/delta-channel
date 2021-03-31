import React from 'react';
import { Link, useParams } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import Button from './Button';
import PostForm from './PostForm';
import NotFound from './NotFound';

const Replies = ({ replies, categorySlug, formIsActive, onClick }) => {
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

  if (isNaN(postId)) {
    return <NotFound />
  };

  return (  
    <section>
      <nav id='replies-navigation'>
        <Link to={`/${categorySlug}`}>back to topics</Link>
      </nav>
      <h2>replies to {categorySlug}#{postId}</h2>

      {!formIsActive && 
        <Button 
          onClick={onClick}
          content='Reply to Topic'
        />
      }
      {formIsActive && 
        <PostForm 
          onCancel={onClick}
          formRoute={`${categorySlug}/topic/${postId}`}
        />
      }

      {formatReplies(replies)}
    </section>
  );
};
 
export default Replies;