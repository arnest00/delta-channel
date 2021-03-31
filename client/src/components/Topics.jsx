import React from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import Button from './Button';
import PostForm from './PostForm';

const Topics = ({ category, topics, slug, formIsActive, onClick }) => {
  document.title = `${category} - deltaChannel`;

  const formatTopics = topics => {
    return topics.map(t => (
      <section key={t.postId}>
        <header>
          <div>
            <h3>#{t.postId}</h3>
            <Link to={`/${slug}/topic/${t.postId}`} className='expand'>View Topic ({t.topicChildren} replies)</Link>
          </div>
          <div>
            <span>{t.author}</span>
            <time dateTime={t.timestamp}>{formatDate(t.timestamp)}</time>
          </div>
        </header>
        <span>{t.postContent}</span>
      </section>
    ));
  };
  
  return ( 
    <article>
      <nav id='topics-navigation'>
        <Link to='/'>back to categories</Link>
      </nav>
      <h2>topics in {slug}</h2>

      {!formIsActive && 
        <Button 
          onClick={onClick}
          content='Create New Topic'
        />
      }
      {formIsActive && 
        <PostForm 
          onCancel={onClick}
          formRoute={slug}
        />
      }

      {formatTopics(topics)}
    </article>
  );
}
 
export default Topics;