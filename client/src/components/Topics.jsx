import React, { useState, useEffect } from 'react';
import fetch from 'node-fetch';

const Topics = ({ category }) => {
  const [ topics, setTopics ] = useState([]);

  useEffect(() => {
    let isActive = true;

    const fetchTopics = async () => {
      const response = await fetch('/api/posts');

      if (isActive) {
        const data = await response.json();
        setTopics(data);
      };
    };

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
      <h2>{category}</h2>
      {formatTopics(topics)}
    </article>
  );
}
 
export default Topics;