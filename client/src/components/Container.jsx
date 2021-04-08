import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Header from './Header';
import Categories from './Categories';
import Topics from './Topics';
import Replies from './Replies';
import PostSuccess from './PostSuccess';
import Faq from './Faq';
import Rules from './Rules';
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
      categorySlug: 'tb', 
      categoryName: 'testBoard', 
      categoryDescription: 'Test posting on deltaChannel'
    }, 
  ];
  const [ content, setContent ] = useState([]);
  const [ currentPath, setCurrentPath ] = useState('/');
  const [ formIsActive, setFormIsActive ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setContent([]);
    setFormIsActive(false);
    setCurrentPath(pathname);

    let isActive = true;
    const fetchContent = async () => {
      setIsLoading(true);
      const response = await fetch(`/api${currentPath}`);

      if (isActive) {
        const data = await response.json();

        setContent(data);
        setIsLoading(false);
      };
    };

    if (
      currentPath !== '/' && currentPath !== '/not-found' && currentPath !== '/faq' && currentPath !== '/rules' && !currentPath.includes('success')
    ) fetchContent();

    return function cleanup() {
      isActive = false;
    };
  }, [ pathname, currentPath ]);

  const handleClick = () => {
    setFormIsActive(!formIsActive);
  };

  const setHeader = pathname => {
    const slug = [...pathname].slice(1,3).join('');

    for (let i = 0; i < categories.length; i++) {
      if (slug === categories[i].categorySlug) {
        return { name: categories[i].categoryName, description: categories[i].categoryDescription};
      };
    };

    return { name: 'deltaChannel'};
  };

  const setTitle = pathname => {
    const slug = [...pathname].slice(1,3).join('');

    for (let i = 0; i < categories.length; i++) {
      if (slug === categories[i].categorySlug) {
        return document.title = `${categories[i].categoryName} - deltaChannel`;
      };
    };

    document.title = 'deltaChannel';
  }

  const formatReplyViewRoutes = categories => {
    return categories.map((c,idx) => (
      <Route key={`${idx}`} path={`/${c.categorySlug}/topic/:postId`}>
        <Replies 
          replies={content}
          categorySlug={c.categorySlug}
          formIsActive={formIsActive}
          isLoading={isLoading}
          onClick={handleClick}
        />
      </Route>
    ));
  };

  const formatTopicViewRoutes = categories => {
    return categories.map((c,idx) => (
      <Route key={`${idx}`} path={`/${c.categorySlug}`}>
        <Topics 
          topics={content}
          categorySlug={c.categorySlug}
          formIsActive={formIsActive}
          isLoading={isLoading}
          onClick={handleClick}
        />
      </Route>
    ));
  };

  setTitle(pathname);

  return ( 
    <React.Fragment>
      <Header header={setHeader(pathname)} categories={categories} />
      <main id='Container'>
        <Switch>
          <Route path='/:categorySlug/topic/:postId/success' component={PostSuccess} />
          {formatReplyViewRoutes(categories)}
          <Route path='/:categorySlug/success' component={PostSuccess} />
          {formatTopicViewRoutes(categories)}
          <Route path='/faq' component={Faq} />
          <Route path='/rules' component={Rules} />
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