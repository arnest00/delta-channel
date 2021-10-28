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
            <div className="banner">
              {categories[i].categoryBanner && <Link to='/'><img 
                height='150'
                width='380' 
                src={categories[i].categoryBanner} 
                title={categories[i].categoryName} 
                alt={categories[i].categoryName} 
              /></Link>}
            </div>
            <h1>{categories[i].categoryName}</h1>
            {categories[i].categoryDescription && <span>{categories[i].categoryDescription}</span>}
          </React.Fragment>
        );
      };
    };

    return <h1><Link to='/'>deltaChannel</Link></h1>;
  };

  return ( 
    <header className='Header'>
      <nav className='header-navigation'>
        <div>
          <label>
            Category:
            <select className='category-selector' onChange={onChange} defaultValue=''>
              <option value='' disabled>--Select category--</option>
              {formatCategoryOptions(categories)}
            </select>
          </label>
        </div>
        <div>
          <a href="#bottom">▼</a>
          <Link to='/'>home</Link>
          <Link to='/about'>about</Link>
        </div>
      </nav>
      <div className='header-content'>
        {formatHeader(path)}
      </div>
    </header>
  );
};
 
export default Header;