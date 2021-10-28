import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './common/Button';
import PostForm from './PostForm';
import Post from './Post';
import NowLoading from './NowLoading';
import Pagination from './common/Pagination';

const Topics = ({ history, pathname, categorySlug }) => {
  const [ content, setContent ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ noTopics, setNoTopics ] = useState(false);
  const [ update, setUpdate ] = useState({});
  const [ formIsActive, setFormIsActive ] = useState(false);
  const [ currentPage, setCurrentPage ] = useState(0);

  const pageSize = 5;

  useEffect(() => {
    const fetchContent = async () => {
      
      try {
        setIsLoading(true);
        const response = await fetch(`/api${pathname}`);
        const data = await response.json();

        if (isActive) {
          setContent(data);
          setIsLoading(false);
          if (data.length === 0) setNoTopics(true);
        };
      } catch (e) {
        history.replace('/not-found');
      };
    };
    let isActive = true;

    if (!pathname.includes('success') && !pathname.includes('failure')) fetchContent();

    return function cleanup() {
      isActive = false;
    };
  }, [ pathname, history, update ]);

  const formatTopics = topics => {
    const sortedTopics = topics.sort((a, b) => {
      return (a.topicLatest > b.topicLatest) ? -1 : ((a.topicLatest < b.topicLatest) ? 1 : 0);
    });

    const filteredTopics = sortedTopics.slice(currentPage * pageSize, (currentPage * pageSize) + pageSize);

    const formattedTopics = filteredTopics.map(t => (
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

  const handleUpdate = () => {
    if (noTopics === true) setNoTopics(false);
    setUpdate({});
  };
  
  return ( 
    <article className='Posts container'>
      <div className='posts-container'>
        <section className={`content${formIsActive ? ' expanded' : ''}`}>
          <h2>topics in {categorySlug}</h2>

          <div className="button-container mobile">
            {!formIsActive && <Button onClick={handleCancel} content='Create new Topic' className='button new-button'/>}
          </div>
          {formIsActive && <PostForm 
            formRoute={categorySlug}
            onClick={handleCancel}
            formIsActive={formIsActive}
          />}

          {formatTopics(content)}
          {isLoading && <NowLoading />}
          {noTopics && <section>There are no topics. Start a conversation.</section>}

          <Pagination 
            contentCount={content.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />

          <nav className='posts-navigation mobile'>
            <Link to='/'>back to categories</Link>
            <Button
              onClick={handleUpdate}
              content='refresh topics'
              className='update-link'
            />
          </nav>
        </section>

        <section className='sidebar'>
          <nav className='posts-navigation'>
            <Link to='/'>back to categories</Link>
            <Button
              onClick={handleUpdate}
              content='refresh topics'
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