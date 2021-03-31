import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Header from './Header';
import Categories from './Categories';
import Topics from './Topics';
import Replies from './Replies';
import NotFound from './NotFound';
import Footer from './Footer';

const Container = () => {
  const categories = [
    {
      categorySlug: 'mp', 
      categoryName: 'movingPictures', 
      categoryDescription: 'Movies and television'
    }, 
    {
      categorySlug: 'st', 
      categoryName: 'smallTalk', 
      categoryDescription: <React.Fragment><i>n.</i> <b>1.</b> polite conversation about unimportant things</React.Fragment>
    }, 
    {
      categorySlug: 'vg', 
      categoryName: 'videoGames', 
      categoryDescription: 'Console, PC, retro'
    }, 
    {
      categorySlug: 'test', 
      categoryName: 'testBoard', 
      categoryDescription: 'Test posting on deltaChannel'
    }, 
  ];
  const [ content, setContent ] = useState([]);
  const [ currentPath, setCurrentPath ] = useState('/');
  const [ formIsActive, setFormIsActive ] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setContent([]);
    setCurrentPath(pathname);

    let isActive = true;
    const fetchContent = async () => {
      const response = await fetch(`/api${currentPath}`);

      if (isActive) {
        const data = await response.json();

        setContent(data);
      };
    };

    if (currentPath !== '/') fetchContent();

    return function cleanup() {
      isActive = false;
    };
  }, [ pathname, currentPath ]);

  const handleClick = () => {
    setFormIsActive(!formIsActive);
  };

  const formatHeader = pathname => {
    const slug = [...pathname].slice(1,3).join('');

    for (let i = 0; i < categories.length; i++) {
      if (slug === categories[i].categorySlug)
        return { name: categories[i].categoryName, description: categories[i].categoryDescription};
    };

    return { name: 'deltaChannel'};
  };

  const formatReplyViewRoutes = categories => {
    return categories.map((c,idx) => (
      <Route key={`top-${idx}`} path={`/${c.categorySlug}/topic/:postId`}>
        <Replies 
          replies={content}
          categorySlug={c.categorySlug}
          formIsActive={formIsActive}
          onClick={handleClick}
        />
      </Route>
    ));
  };

  const formatTopicViewRoutes = categories => {
    return categories.map((c,idx) => (
      <Route key={`cat-${idx}`} path={`/${c.categorySlug}`}>
        <Topics 
          category={c.categoryName} 
          topics={content}
          slug={c.categorySlug}
          formIsActive={formIsActive}
          onClick={handleClick}
        />
      </Route>
    ));
  };

  return ( 
    <React.Fragment>
      <Header header={formatHeader(pathname)} />
      <main>
        <Switch>
          {formatReplyViewRoutes(categories)}
          {formatTopicViewRoutes(categories)}
          <Route path='/not-found' component={NotFound} />
          <Route exact path='/'>
            <Categories categories={categories} />
          </Route>
          <Redirect to='/not-found' />
        </Switch>
      </main>
      <Footer />
    </React.Fragment>
  );
};
 
export default Container;