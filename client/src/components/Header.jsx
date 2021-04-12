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
    <header id='Header'>
      <nav id='header-navigation'>
        <div>
          <select id='category-selector' onChange={onChange}>
            {formatCategoryOptions(categories)}
          </select>
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