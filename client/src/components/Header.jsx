import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ header, categories }) => {
  const formatCategoryLinks = categories => {
    return categories.map((c, idx) => (
      <React.Fragment key={idx}>
        <Link to={`/${c.categorySlug}`}>{c.categorySlug}</Link>
      </React.Fragment>
    ));
  };

  return ( 
    <header id="Header">
      <nav className="header-navigation">
        <div>
          {formatCategoryLinks(categories)}
        </div>
        <div>
          <Link to='/'>home</Link>
          <Link to='/faq'>faq</Link>
          <Link to='/rules'>rules</Link>
        </div>
      </nav>
      <div id='header-content'>
        <h1>{header.name}</h1>
        {header.description && <span>{header.description}</span>}
      </div>
    </header>
  );
};
 
export default Header;