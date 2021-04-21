import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import Button from './common/Button';
import PostForm from './PostForm';
import NowLoading from './NowLoading';

const Topics = ({ topics, categorySlug, isLoading }) => {
  const [ formIsActive, setFormIsActive ] = useState(false);

  const formatTopics = topics => {
    const sortedTopics = topics.sort((a, b) => {
      return (a.topicLatest > b.topicLatest) ? -1 : ((a.topicLatest < b.topicLatest) ? 1 : 0);
    });

    const formattedTopics = sortedTopics.map(t => (
      <section key={t.postId} className='post-card'>
        <header className='post-header'>
          <h3 className='post-number'>#{t.postId}</h3>
          <span>Author: {t.author}</span>
        </header>
        <div className='post-content-container'>
          <pre className='post-content'>{t.postContent}</pre>
        </div>
        <div className="post-footer">
          <time>Last Reply: {formatDate(t.topicLatest)}</time>
          <Link to={`/${categorySlug}/topic/${t.postId}`}>View Topic ({t.topicChildren} replies)</Link>
        </div>
      </section>
    ));

    return formattedTopics;
  };

  const handleCancel = () => {
    setFormIsActive(!formIsActive);
  };
  
  return ( 
    <article id='posts' className={formIsActive ? 'expanded' : ''}>
      <nav id='posts-navigation'>
        <Link to='/'>back to categories</Link>
      </nav>
      <h2>topics in {categorySlug}</h2>

      <div className="button-container">
        {!formIsActive && <Button onClick={handleCancel} content='Create new Topic' className='button new-button'/>}
      </div>

      {isLoading && <NowLoading />}
      {formatTopics(topics)}

      {formIsActive && <PostForm 
        formRoute={categorySlug}
        onClick={handleCancel}
        formIsActive={formIsActive}
      />}
    </article>
  );
}
 
export default Topics;