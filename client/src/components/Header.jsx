import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ path, categories, onChange }) => {
  const formatCategoryOptions = categories => {
    return categories.map((c, idx) => (
      <option key={idx} value={c.categorySlug}>
        {c.categoryName}
      </option>
    ));
  };

  const formatHeader = path => {
    for (let i = 0; i < categories.length; i++) {
      if (path === categories[i].categorySlug) {
        return (
          <React.Fragment>
            <h1>{categories[i].categoryName}</h1>
            {categories[i].categoryDescription && <span>{categories[i].categoryDescription}</span>}
          </React.Fragment>
        );
      };
    };

    return <h1>deltaChannel</h1>;
  };

  return ( 
    <header id='Header'>
      <nav id='header-navigation'>
        <div>
          <label>
            Category:
            <select id='category-selector' onChange={onChange} defaultValue={''}>
              <option value='' disabled>--Select category--</option>
              {formatCategoryOptions(categories)}
            </select>
          </label>
        </div>
        <div>
          <a href="#bottom">▼</a>
          <Link to='/'>home</Link>
          <Link to='/about'>about</Link>
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