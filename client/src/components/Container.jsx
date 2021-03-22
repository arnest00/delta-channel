import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import Topics from './Topics';
import NotFound from './NotFound';
import Categories from './Categories';
import Footer from './Footer';

const Container = () => {
  return ( 
    <React.Fragment>
      <Header 
        title={'deltaChannel'}
      />
      <main>
        <Switch>
          <Route path='/mp'>
            <Topics category='movingPictures' />
          </Route>
          <Route path='/st'>
            <Topics category='smallTalk' />
          </Route>
          <Route path='/tt'>
            <Topics category='tableTop' />
          </Route>
          <Route path='/vg'>
            <Topics category='videoGames' />
          </Route>
          <Route path='/not-found' component={NotFound} />
          <Route exact path='/' component={Categories} />
          <Redirect to='/not-found' />
        </Switch>
      </main>
      <Footer />
    </React.Fragment>
  );
};
 
export default Container;