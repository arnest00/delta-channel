import React from 'react';
import { Link } from 'react-router-dom';

const Categories = ({ categories }) => {
  const formatCategories = categories => {
    return categories.map((c, idx) => (
      <section key={idx} className='category'>
        <div className="banner">
          <Link to={`/${c.categorySlug}`}>
            <img 
              height='150'
              width='380' 
              src={c.categoryBanner} 
              title={c.categoryName} 
              alt={c.categoryName} 
            />
          </Link>
        </div>
        <h3>
          <Link to={`/${c.categorySlug}`}>{c.categoryName}</Link>
        </h3>
        <span className="description">{c.categoryDescription}</span>
      </section>
    ));
  };
  
  return ( 
    <article className='Categories container'>
      <h2>categories</h2>
      {formatCategories(categories)}
    </article>
  );
};

export default Categories;