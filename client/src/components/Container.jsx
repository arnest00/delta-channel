import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Topics from './Topics';
import NotFound from './NotFound';
import Categories from './Categories';

const Container = () => {
  return ( 
    <main>
      <Switch>
        <Route path='/pe'>
          <Topics category='passiveEntertainment' />
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
  );
};
 
export default Container;