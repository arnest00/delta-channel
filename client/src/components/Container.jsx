import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Categories from './Categories';
import Topics from './Topics';

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
        <Route path='/'>
          <Categories />
        </Route>
      </Switch>
    </main>
  );
};
 
export default Container;