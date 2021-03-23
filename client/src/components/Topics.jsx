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

  const formatTopics = topics => {
    let formattedTopics = [];

    for (let i = topics.length - 1; i >= 0; i--) {
      formattedTopics.push(
        <section key={topics[i].postId}>
          <header>{`>>`}{topics[i].postId}</header>
          <p>{topics[i].postContent}</p>
        </section>
      );
    };

    return formattedTopics;
  };
  
  return ( 
    <article>
      <nav id='topic-navigation'>
        <Link to='/'>Back to Categories</Link>
      </nav>
      <h2>{category}</h2>
      {formatTopics(topics)}
    </article>
  );
}
 
export default Topics;