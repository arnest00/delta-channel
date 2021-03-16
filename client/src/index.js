import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import './index.css';
import App from './App.jsx';
import Header from './components/Header';

ReactDOM.render(
  <React.StrictMode>
    {/* <Header /> */}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);