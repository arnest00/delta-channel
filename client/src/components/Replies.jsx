import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from './Button';
import PostForm from './PostForm';
import fetch from 'node-fetch';

const Replies = ({ categorySlug }) => {
  const [ replies, setReplies ] = useState([]);
  const [ formIsActive, setFormIsActive ] = useState(false);
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
    return replies.map((r, idx) => (
      <section key={idx}>
        <header>
          <div>
            <h3>#{r.postId}</h3>
          </div>
          <div>
            <span>{r.author}</span>
            <time dateTime={r.timestamp}>{formatDate(r.timestamp)}</time>
          </div>
        </header>
        <span>{r.postContent}</span>
      </section>
    ));
  };

  const handleClick = () => {
    setFormIsActive(!formIsActive);
  };

  return (  
    <section>
      <nav id='replies-navigation'>
        <Link to={categorySlug}>back to topics</Link>
      </nav>
      <h2>replies to {categorySlug.slice(1)}#{postId}</h2>
        {!formIsActive && 
          <Button 
            onClick={handleClick}
            content='Reply to Topic'
          />
        }
        {formIsActive && 
          <PostForm 
            onCancel={handleClick}
            formRoute={`${categorySlug}/topic/${postId}`}
          />
        }
      {formatReplies(replies)}
    </section>
  );
};
 
export default Replies;