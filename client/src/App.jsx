import React, { useState } from 'react';
import { Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import Theme from './components/Theme';
import Title from './components/Title';
import Header from './components/Header';
import PostFeedback from './components/PostFeedback';
import Replies from './components/Replies';
import Topics from './components/Topics';
import About from './components/About';
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

  const [ currentTheme, setCurrentTheme ] = useState(
    localStorage.getItem('userTheme') ? 
      localStorage.getItem('userTheme') : window.matchMedia('(prefers-color-scheme: dark)') ? 
      'dark' : 'lite'
  );

  const formatReplyViewRoutes = categories => {
    return categories.map((c,idx) => (
      <Route key={`${idx}`} path={`/${c.categorySlug}/topic/:postId`}>
        <Replies 
          history={history}
          pathname={pathname}
          categorySlug={c.categorySlug}
        />
      </Route>
    ));
  };

  const formatTopicViewRoutes = categories => {
    return categories.map((c,idx) => (
      <Route key={`${idx}`} path={`/${c.categorySlug}`}>
        <Topics 
          history={history}
          pathname={pathname}
          categorySlug={c.categorySlug}
        />
      </Route>
    ));
  };

  const handleCategorySelect = e => {
    const selectedCategory = e.target.value;

    e.target.value = '';

    if (selectedCategory === pathname.slice(1)) return;
    history.push(`/${selectedCategory}`);
  };

  const handleThemeSelect = e => {
    const selectedTheme = e.target.value;

    if (selectedTheme === currentTheme) return;

    localStorage.setItem('userTheme', selectedTheme);
    setCurrentTheme(selectedTheme);
  };

  return (
    <div className='App'>
      <div id="top"></div>
      <Theme themes={themes} currentTheme={currentTheme} />
      <Title path={pathname.slice(1,3)} categories={categories} />
      <Header path={pathname.slice(1,3)} categories={categories} onChange={handleCategorySelect} />
      <main>
        <Switch>
          <Route path='/:categorySlug/topic/:postId/failure'>
            <PostFeedback success={false} />
          </Route>
          <Route path='/:categorySlug/topic/:postId/success'>
            <PostFeedback success={true} />
          </Route>
          {formatReplyViewRoutes(categories)}

          <Route path='/:categorySlug/failure'>
            <PostFeedback success={false} />
          </Route>
          <Route path='/:categorySlug/success'>
            <PostFeedback success={true} />
          </Route>
          {formatTopicViewRoutes(categories)}
          
          <Route path='/about' component={About} />
          <Route path='/not-found' component={NotFound} />
          <Route exact path='/'>
            <Categories categories={categories} />
          </Route>
          <Redirect to='/not-found' />
        </Switch>
      </main>
      <Footer themes={themes} onChange={handleThemeSelect} />
      <div id="bottom"></div>
    </div>
  );
};

export default App;