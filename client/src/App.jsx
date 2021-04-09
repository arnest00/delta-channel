import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import Title from './components/Title';
import Header from './components/Header';
import PostSuccess from './components/PostSuccess';
import Replies from './components/Replies';
import Topics from './components/Topics';
import Faq from './components/Faq';
import Rules from './components/Rules';
import Categories from './components/Categories';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import './stylesheets/App.scss';

function App() {
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
  const [ isLoading, setIsLoading ] = useState(false);

  const { pathname } = useLocation();
  let history = useHistory();

  useEffect(() => {
    setContent([]);
    setCurrentPath(pathname);

    let isActive = true;
    const fetchContent = () => {
      setIsLoading(true);

      fetch(`/api${currentPath}`)
        .then(response => {
          if (!response.ok) history.replace('/not-found');
          if (isActive) {
            response.json()
              .then(data => {
                setContent(data);
                setIsLoading(false);
              })
              .catch(err => console.log(err));
          };
        })
        .catch(err => console.log(err));
    };

    const staticRoutes = [ '/', '/not-found', '/faq', '/rules' ];
    if (!staticRoutes.includes(currentPath) && !currentPath.includes('success')) fetchContent();

    return function cleanup() {
      isActive = false;
    };
  }, [ history, pathname, currentPath ]);

  const formatReplyViewRoutes = categories => {
    return categories.map((c,idx) => (
      <Route key={`${idx}`} path={`/${c.categorySlug}/topic/:postId`}>
        <Replies 
          replies={content}
          categorySlug={c.categorySlug}
          isLoading={isLoading}
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
          isLoading={isLoading}
        />
      </Route>
    ));
  };

  return (
    <div id='App'>
      <Title path={pathname.slice(1,3)} categories={categories} />
      <Header path={pathname.slice(1,3)} categories={categories} />
      <main>
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
    </div>
  );
};

export default App;