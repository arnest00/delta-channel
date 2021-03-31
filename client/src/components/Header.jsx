import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ header }) => {
  return ( 
    <header id="header">
      <nav className="header-navigation">
        <Link to='/'>home</Link>
      </nav>
      <div>
        <h1>{header.name}</h1>
        {header.description && <span>{header.description}</span>}
      </div>
    </header>
  );
};
 
export default Header;