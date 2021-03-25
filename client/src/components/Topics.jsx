import React, { useState, useEffect } from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import Replies from './Replies';
import fetch from 'node-fetch';

const Topics = ({ category, slug }) => {
  const [ topics, setTopics ] = useState([]);
  const { url, path } = useRouteMatch();

  useEffect(() => {
    let isActive = true;
    const fetchTopics = async () => {
      const response = await fetch(`/api/${slug}`);

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
    const day = dateObj.toLocaleString('default', { weekday: 'short' });
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const date = dateObj.getDate();
    const year = dateObj.getFullYear();

    return `${day}, ${month} ${date}, ${year}`;
  };

  const formatTopics = topics => {
    return topics.map(t => (
      <section key={t.postId}>
        <header>
          <div>
            <h3>#{t.postId}</h3>
          </div>
          <div>
            <span>Anonymous</span>
            <time dateTime={t.timestamp}>{formatDate(t.timestamp)}</time>
            <Link to={`${path}/topic/${t.postId}`} className='expand'>View/Reply</Link>
          </div>
        </header>
        <span>{t.postContent}</span>
      </section>
    ));
  };
  
  return ( 
    <article>
      <Switch>
      <Route path={`${url}/topic/:postId`}>
        <Replies 
          categorySlug={url}
        />
      </Route>
      <Route exact path={url}>
        <nav id='topics-navigation'>
          <Link to='/'>back to categories</Link>
        </nav>
        <h2>topics in {slug}</h2>
        {formatTopics(topics)}
      </Route>
      </Switch>
    </article>
  );
}
 
export default Topics;