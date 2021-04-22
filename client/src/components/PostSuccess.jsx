import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const PostSuccess = () => {
  const [ timeRemaining, setTimeRemaining ] = useState(3);
  const { categorySlug, postId } = useParams();
  const prevPage = `/${categorySlug}/${postId ? `topic/${postId}` : ``}`
  let history = useHistory();
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (timeRemaining === 0) return history.push(prevPage);
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    return function cleanup() {
      clearTimeout(timeoutId);
    };
  });

  return ( 
    <article className='info'>
      <h2>Post succeeded!</h2>
      <p>You will be redirected to the previous page in {timeRemaining} seconds...</p>
    </article>
  );
};

export default PostSuccess;