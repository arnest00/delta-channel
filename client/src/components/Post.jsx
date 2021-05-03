import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './common/Button';
import formatDate from '../utils/formatDate';

const Post = ({ post, categorySlug, isTopic }) => {
  const [ readMore, setReadMore ] = useState(false);

  const handleReadMore = () => {
    setReadMore(true);
  };

  const formatContent = isTopic => { 
    const postContentContainer = (
      <div className='post-content-container'>
        <pre className='post-content'>{post.postContent}</pre>
      </div>
    );
    const truncatedPostContent = `${post.postContent.slice(0, 249)}... `;

    if (!isTopic) 
      return postContentContainer;

    if (!readMore && (post.postContent.length > 275)) 
      return (
        <div className="post-content-container">
          <pre className='post-content'>
            {truncatedPostContent}
            <Button 
              onClick={handleReadMore} 
              content='Read more'
              className='post-readmore-link'
            />
          </pre>
        </div>
      );
    else 
      return postContentContainer;
  };

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
      {formatContent(isTopic)}
      {formatFooter(isTopic)}
    </section>
  );
};
 
export default Post;