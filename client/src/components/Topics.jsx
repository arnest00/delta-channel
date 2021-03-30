import React, { useState, useEffect } from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import fetch from 'node-fetch';
import Replies from './Replies';
import Button from './Button';
import PostForm from './PostForm';
import PostSuccess from './PostSuccess';

const Topics = ({ category, slug }) => {
  const [ topics, setTopics ] = useState([]);
  const [ formIsActive, setFormIsActive ] = useState(false);
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
            <Link to={`${path}/topic/${t.postId}`} className='expand'>View Topic ({t.topicChildren} replies)</Link>
          </div>
          <div>
            <span>{t.author}</span>
            <time dateTime={t.timestamp}>{formatDate(t.timestamp)}</time>
          </div>
        </header>
        <span>{t.postContent}</span>
      </section>
    ));
  };

  const handleClick = () => {
    setFormIsActive(!formIsActive);
  };
  
  return ( 
    <article>
      <Switch>
        <Route path={`${url}/success`} component={PostSuccess} />

        <Route exact path={url}>
          <nav id='topics-navigation'>
            <Link to='/'>back to categories</Link>
          </nav>
          <h2>topics in {slug}</h2>
          {!formIsActive && 
            <Button 
              onClick={handleClick}
              content='Create New Topic'
            />
          }
          {formIsActive && 
            <PostForm 
              onCancel={handleClick}
              formRoute={slug}
            />
          }
          {formatTopics(topics)}
        </Route>

        <Route path={`${url}/topic/:postId/success`} component={PostSuccess} />

        <Route path={`${url}/topic/:postId`}>
          <Replies 
            categorySlug={url}
          />
        </Route>
      </Switch>
    </article>
  );
}
 
export default Topics;