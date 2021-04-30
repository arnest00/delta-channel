import React from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../utils/formatDate';

const Post = ({ post, categorySlug, isTopic }) => {
  const formatFooter = isTopic => {
    if (isTopic) 
      return (
        <div className='post-footer'>
          <time>Last Reply: {formatDate(post.topicLatest)}</time>
          <Link to={`/${categorySlug}/topic/${post.postId}`}>View Topic ({post.topicChildren} replies)</Link>
        </div>
      );
    else return null;
  };

  return (
    <section className='post-card'>
      <header className='post-header'>
        <div>
          <h3 className='post-number'>#{post.postId}</h3>
          <span>{post.author}</span>
        </div>
        <time dateTime={post.timestamp}>{formatDate(post.timestamp)}</time>
      </header>
      <div className='post-content-container'>
        <pre className='post-content'>{post.postContent}</pre>
      </div>
      {formatFooter(isTopic)}
    </section>
  );
};
 
export default Post;