import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ title }) => {
  return ( 
    <header id="header">
      <nav className="header-navigation">
        <Link to='/'>home</Link>
      </nav>
      <div>
        <h1>{title.name}</h1>
        {title.description && <span>{title.description}</span>}
      </div>
    </header>
  );
};
 
export default Header;