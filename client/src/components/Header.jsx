import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ path, categories }) => {
  const formatCategoryLinks = categories => {
    return categories.map((c, idx) => (
      <React.Fragment key={idx}>
        <Link to={`/${c.categorySlug}`}>{c.categorySlug}</Link>
      </React.Fragment>
    ));
  };

  const formatHeader = path => {
    for (let i = 0; i < categories.length; i++) {
      if (path === categories[i].categorySlug) {
        return (
          <React.Fragment>
            <h1>
              {categories[i].categoryName}
            </h1>
            {categories[i].categoryDescription && <span>{categories[i].categoryDescription}</span>}
          </React.Fragment>
        );
      };
    };

    return <h1>deltaChannel</h1>;
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
        {formatHeader(path)}
      </div>
    </header>
  );
};
 
export default Header;