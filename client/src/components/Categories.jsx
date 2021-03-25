import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Categories = ({ categories }) => {
  const formatCategories = categories => {
    return categories.map((c, idx) => (
      <section key={idx}>
        <h3>
          <Link to={`/${c.categorySlug}`}>{c.categoryName}</Link>
        </h3>
        <span className="description">{c.categoryDescription}</span>
      </section>
    ));
  };

  useEffect(() => {
    document.title = `deltaChannel`;
  });
  
  return ( 
    <article>
      <h2>categories</h2>
      <div>
        {formatCategories(categories)}
      </div>
    </article>
  );
};

export default Categories;