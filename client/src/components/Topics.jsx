import React from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import Button from './Button';
import PostForm from './PostForm';

const Topics = ({ topics, categorySlug, formIsActive, onClick }) => {
  const formatTopics = topics => {
    const sortedTopics = topics.sort((a, b) => {
      return (a.topicLatest > b.topicLatest) ? -1 : ((a.topicLatest < b.topicLatest) ? 1 : 0);
    });

    const formattedTopics = sortedTopics.map(t => (
      <section key={t.postId}>
        <header>
          <div>
            <h3>#{t.postId}</h3>
            <span>Last Reply {formatDate(t.topicLatest)}</span>
            <Link to={`/${categorySlug}/topic/${t.postId}`} className='expand'>View Topic ({t.topicChildren} replies)</Link>
          </div>
          <div>
            <span>{t.author}</span>
            <time dateTime={t.timestamp}>{formatDate(t.timestamp)}</time>
          </div>
        </header>
        <pre>{t.postContent}</pre>
      </section>
    ));

    return formattedTopics;
  };
  
  return ( 
    <article>
      <nav id='topics-navigation'>
        <Link to='/'>back to categories</Link>
      </nav>
      <h2>topics in {categorySlug}</h2>

      {!formIsActive && 
        <Button 
          onClick={onClick}
          content='Create New Topic'
        />
      }
      {formIsActive && 
        <PostForm 
          onCancel={onClick}
          formRoute={categorySlug}
        />
      }

      {formatTopics(topics)}
    </article>
  );
}
 
export default Topics;