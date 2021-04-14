import React from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import PostForm from './PostForm';
import NowLoading from './NowLoading';

const Topics = ({ topics, categorySlug, isLoading }) => {
  const formatTopics = topics => {
    const sortedTopics = topics.sort((a, b) => {
      return (a.topicLatest > b.topicLatest) ? -1 : ((a.topicLatest < b.topicLatest) ? 1 : 0);
    });

    const formattedTopics = sortedTopics.map(t => (
      <section key={t.postId} className='post-card'>
        <header className='post-header'>
          <h3 className='post-number'>#{t.postId}</h3>
          <div className='post-info-container'>
            <span>Author: {t.author}</span>
            <span>Last Reply: {formatDate(t.topicLatest)}</span>
          </div>
        </header>
        <pre className='post-content'>{t.postContent}</pre>
        <Link to={`/${categorySlug}/topic/${t.postId}`} className='expand'>View Topic ({t.topicChildren} replies)</Link>
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

      <PostForm 
        formAction='Create new Topic'
        formRoute={categorySlug}
      />

      {isLoading && <NowLoading />}
      {formatTopics(topics)}
    </article>
  );
}
 
export default Topics;