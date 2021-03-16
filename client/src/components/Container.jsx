import React, { useState, useEffect } from 'react';
import fetch from 'node-fetch';
import PostForm from './PostForm';
import PostRoll from './PostRoll';

const Container = () => {
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    fetchPosts();
  })

  const fetchPosts = async () => {
    const response = await fetch('/api/posts');
    const data = await response.json();
    setPosts(data);
  };

  return ( 
    <section>
      <PostForm 
        onClick={() => console.log('Click!')}
      />
      <PostRoll 
        posts={posts ? posts : []}
      />
    </section>
  );
};
 
export default Container;