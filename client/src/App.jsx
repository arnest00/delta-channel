import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import fetch from 'node-fetch';
import Theme from './components/Theme';
import Title from './components/Title';
import Header from './components/Header';
import PostSuccess from './components/PostSuccess';
import PostFailure from './components/PostFailure';
import Replies from './components/Replies';
import Topics from './components/Topics';
import About from './components/About';
import Rules from './components/Rules';
import Categories from './components/Categories';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import { getCategories } from './services/categoryService';
import { getThemes } from './services/themeService';
import './stylesheets/App.scss';

function App() {
  const categories = getCategories();
  const themes = getThemes();
  const { pathname } = useLocation();
  let history = useHistory();
  
  const [ content, setContent ] = useState([]);
  const [ currentPath, setCurrentPath ] = useState('/');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ currentTheme, setCurrentTheme ] = useState('lite');
  
  useEffect(() => {
    const staticRoutes = [ '/', '/not-found', '/about', '/rules' ];
    const fetchContent = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`/api${currentPath}`);
        const data = await response.json();

        if (isActive) {
          setContent(data);
          setIsLoading(false);
          window.scrollTo(0, 0);
        };
      } catch (e) {
        history.replace('/not-found');
      };
    };
    let isActive = true;

    setContent([]);
    setCurrentPath(pathname);

    if (staticRoutes.includes(currentPath)) return;
    if (!currentPath.includes('success') && !currentPath.includes('failure')) fetchContent();

    return function cleanup() {
      isActive = false;
    };
  }, [ pathname, currentPath, history ]);

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

  const handleCategorySelect = e => {
    const selectedCategory = e.target.value;

    e.target.value = '';

    if (selectedCategory === currentPath.slice(1)) return;
    history.push(`/${selectedCategory}`);
  };

  const handleThemeSelect = e => {
    const selectedTheme = e.target.value;

    if (selectedTheme === currentTheme) return;
    setCurrentTheme(selectedTheme);
  };

  return (
    <div id='App'>
      <div id='top'></div>
      <Theme themes={themes} currentTheme={currentTheme} />
      <Title path={pathname.slice(1,3)} categories={categories} />
      <Header path={pathname.slice(1,3)} categories={categories} onChange={handleCategorySelect} />
      <main>
        <Switch>
          <Route path='/:categorySlug/topic/:postId/failure' component={PostFailure} />
          <Route path='/:categorySlug/topic/:postId/success' component={PostSuccess} />
          {formatReplyViewRoutes(categories)}
          <Route path='/:categorySlug/failure' component={PostFailure} />
          <Route path='/:categorySlug/success' component={PostSuccess} />
          {formatTopicViewRoutes(categories)}
          <Route path='/about' component={About} />
          <Route path='/rules' component={Rules} />
          <Route path='/not-found' component={NotFound} />
          <Route exact path='/'>
            <Categories categories={categories} />
          </Route>
          <Redirect to='/not-found' />
        </Switch>
      </main>
      <Footer themes={themes} onChange={handleThemeSelect} />
      <div id='bottom'></div>
    </div>
  );
};

export default App;