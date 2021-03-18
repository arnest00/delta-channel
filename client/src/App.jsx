import React from 'react';
import Header from './components/Header';
import Container from './components/Container';
import Footer from './components/Footer';
import './stylesheets/App.scss';

function App() {
  return (
    <React.Fragment>
      <Header />
      <Container />
      <Footer />
    </React.Fragment>
  );
};

export default App;