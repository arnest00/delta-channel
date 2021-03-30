import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Header from './Header';
import Topics from './Topics';
import NotFound from './NotFound';
import Categories from './Categories';
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
    // {
    //   categorySlug: 'tt', 
    //   categoryName: 'tableTop', 
    //   categoryDescription: 'Pen and paper RPGs'
    // }, 
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
  const { pathname } = useLocation();

  const formatTitle = pathname => {
    const title = [...pathname].slice(1,3).join('');

    for (let i = 0; i < categories.length; i++) {
      if (title === categories[i].categorySlug)
        return { name: categories[i].categoryName, description: categories[i].categoryDescription};
    };

    return { name: 'deltaChannel'};
  };

  const formatRoutes = categories => {
    return categories.map((c,idx) => (
      <Route key={idx} path={`/${c.categorySlug}`}>
        <Topics category={c.categoryName} slug={c.categorySlug}/>
      </Route>
    ));
  };

  return ( 
    <React.Fragment>
      <Header 
        title={formatTitle(pathname)}
      />
      <main>
        <Switch>
          {formatRoutes(categories)}
          <Route path='/not-found' component={NotFound} />
          <Route exact path='/'>
            <Categories 
              categories={categories}
            />
          </Route>
          <Redirect to='/not-found' />
        </Switch>
      </main>
      <Footer />
    </React.Fragment>
  );
};
 
export default Container;