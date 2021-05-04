import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from './common/Button';
import PostForm from './PostForm';
import NowLoading from './NowLoading';
import Post from './Post';

const Replies = ({ replies, categorySlug, isLoading, onUpdate }) => {
  const [ formIsActive, setFormIsActive ] = useState(false);
  const { postId } = useParams();

  const formatReplies = replies => {
    return replies.map(r => (
      <Post 
        post={r} 
        key={r.postId} 
        categorySlug={categorySlug} 
        isTopic={false} 
      />
    ));
  };

  const handleCancel = () => {
    setFormIsActive(!formIsActive);
  };

  return ( 
    <article className='Posts container'>
      <div className='posts-container'>
        <section className={`content${formIsActive ? ' expanded' : ''}`}>
          <nav className='posts-navigation mobile'>
            <Link to={`/`}>back to categories</Link>
            <Link to={`/${categorySlug}`}>back to topics</Link>
            <Button
              onClick={onUpdate}
              content='check for new replies'
              className='update-link'
            />
          </nav>

          <h2>replies to {categorySlug}#{postId}</h2>

          <div className="button-container mobile">
            {!formIsActive && <Button onClick={handleCancel} content='Reply to Topic' className='button new-button'/>}
          </div>
          {formIsActive && <PostForm 
            formRoute={`${categorySlug}/topic/${postId}`}
            onClick={handleCancel}
            formIsActive={formIsActive}
          />}

          {isLoading && <NowLoading />}
          {formatReplies(replies)}
        </section>
        
        <section className='sidebar'>
          <nav className='posts-navigation'>
            <Link to={`/`}>back to categories</Link>
            <Link to={`/${categorySlug}`}>back to topics</Link>
            <Button
              onClick={onUpdate}
              content='check for new replies'
              className='update-link'
            />
          </nav>
          <div className="button-container">
            {!formIsActive && <Button onClick={handleCancel} content='Reply to Topic' className='button new-button'/>}
          </div>
          {formIsActive && <PostForm 
            formRoute={`${categorySlug}/topic/${postId}`}
            onClick={handleCancel}
            formIsActive={formIsActive}
          />}
        </section>
      </div>
    </article>
  );
};
 
export default Replies;