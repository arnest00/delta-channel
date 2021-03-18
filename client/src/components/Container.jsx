import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CategoryRoll from './CategoryRoll';

const Container = () => {
  return ( 
    <main>
      <Switch>
        <Route path='/pe'>
          <PE />
        </Route>
        <Route path='/st'>
          <ST />
        </Route>
        <Route path='/tt'>
          <TT />
        </Route>
        <Route path='/vg'>
          <VG />
        </Route>
        <Route path='/'>
          <CategoryRoll 
            user={'Osmond'}
          />
        </Route>
      </Switch>
    </main>
  );
};

function PE() {
  return <h2>passiveEntertainment</h2>;
};

function ST() {
  return <h2>smallTalk</h2>;
};

function TT() {
  return <h2>tableTop</h2>;
};

function VG() {
  return <h2>videoGames</h2>;
};
 
export default Container;