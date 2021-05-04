import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './common/Button';
import PostForm from './PostForm';
import NowLoading from './NowLoading';
import Post from './Post';

const Topics = ({ topics, categorySlug, isLoading, onUpdate }) => {
  const [ formIsActive, setFormIsActive ] = useState(false);

  const formatTopics = topics => {
    const sortedTopics = topics.sort((a, b) => {
      return (a.topicLatest > b.topicLatest) ? -1 : ((a.topicLatest < b.topicLatest) ? 1 : 0);
    });

    const formattedTopics = sortedTopics.map(t => (
      <Post 
        post={t} 
        key={t.postId} 
        categorySlug={categorySlug} 
        isTopic={true} 
      />
    ));
    return formattedTopics;
  };

  const handleCancel = () => {
    setFormIsActive(!formIsActive);
  };
  
  return ( 
    <article className='Posts container'>
      <div className='posts-container'>
        <section className={`content${formIsActive ? ' expanded' : ''}`}>
          <nav className='posts-navigation mobile'>
            <Link to='/'>back to categories</Link>
            <Button
              onClick={onUpdate}
              content='check for new topics'
              className='update-link'
            />
          </nav>
          
          <h2>topics in {categorySlug}</h2>

          <div className="button-container mobile">
            {!formIsActive && <Button onClick={handleCancel} content='Create new Topic' className='button new-button'/>}
          </div>
          {formIsActive && <PostForm 
            formRoute={categorySlug}
            onClick={handleCancel}
            formIsActive={formIsActive}
          />}

          {isLoading && <NowLoading />}
          {formatTopics(topics)}
        </section>

        <section className='sidebar'>
          <nav className='posts-navigation'>
            <Link to='/'>back to categories</Link>
            <Button
              onClick={onUpdate}
              content='check for new topics'
              className='update-link'
            />
          </nav>
          <div className="button-container">
            {!formIsActive && <Button onClick={handleCancel} content='Create new Topic' className='button new-button'/>}
          </div>
          {formIsActive && <PostForm 
            formRoute={categorySlug}
            onClick={handleCancel}
            formIsActive={formIsActive}
          />}
        </section>
      </div>
    </article>
  );
}
 
export default Topics;