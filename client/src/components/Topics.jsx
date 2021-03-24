import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetch from 'node-fetch';

const Topics = ({ category }) => {
  const [ topics, setTopics ] = useState([]);

  useEffect(() => {
    let isActive = true;
    const fetchTopics = async () => {
      const response = await fetch(`/api/${window.location.href.slice(-2)}`);

      if (isActive) {
        const data = await response.json();
        setTopics(data);
      };
    };

    document.title = `${category} - deltaChannel`;
    fetchTopics();

    return function cleanup() {
      isActive = false;
    };
  });

  const formatDate = dateStr => {
    const dateObj = new Date(dateStr);
    const month = dateObj.getMonth();
    const date = dateObj.getDate();
    const year = dateObj.getFullYear();

    return `${month}/${date}/${year}`;
  };

  const formatTopics = topics => {
    return topics.map(t => (
      <section key={t.postId}>
        <header>
          <div>
            <h3>#{t.postId}</h3>
            <Link to={`/`} className='expand'>View/Reply</Link>
          </div>
          <div>
            <time dateTime={t.timestamp}>{formatDate(t.timestamp)}</time>
          </div>
        </header>
        <span>{t.postContent}</span>
      </section>
    ));
  };
  
  return ( 
    <article>
      <nav id='category-navigation'>
        <Link to='/'>Back to Categories</Link>
      </nav>
      <h2>{category}</h2>
      {formatTopics(topics)}
    </article>
  );
}
 
export default Topics;