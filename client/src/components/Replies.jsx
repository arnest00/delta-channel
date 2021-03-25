import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import fetch from 'node-fetch';

const Replies = ({ categorySlug }) => {
  const [ replies, setReplies ] = useState({});
  const { postId } = useParams();

  useEffect(() => {
    let isActive = true;
    const fetchReplies = async () => {
      const response = await fetch(`/api/${categorySlug}/topic/${postId}`);

      if (isActive) {
        const data = await response.json();
        setReplies(data);
      };
    };

    fetchReplies();

    return function cleanup() {
      isActive = false;
    };
  });

  const formatDate = dateStr => {
    const dateObj = new Date(dateStr);
    const day = dateObj.toLocaleString('default', { weekday: 'short' });
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const date = dateObj.getDate();
    const year = dateObj.getFullYear();

    return `${day}, ${month} ${date}, ${year}`;
  };

  const formatReplies = replies => {
    return (
      <section key={replies.postId}>
        <header>
          <div>
            <h3>#{replies.postId}</h3>
          </div>
          <div>
            <span>Anonymous</span>
            <time dateTime={replies.timestamp}>{formatDate(replies.timestamp)}</time>
          </div>
        </header>
        <span>{replies.postContent}</span>
      </section>
    );
  };

  return (  
    <section>
      <nav id='replies-navigation'>
        <Link to={categorySlug}>back to topics</Link>
      </nav>
      <h2>replies to {categorySlug.slice(1)}#{postId}</h2>
      {formatReplies(replies)}
    </section>
  );
};
 
export default Replies;