import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    {
      categoryUrl: 'mp', 
      categoryName: 'movingPictures', 
      categoryDescription: 'Movies and television'
    }, 
    {
      categoryUrl: 'st', 
      categoryName: 'smallTalk', 
      categoryDescription: <React.Fragment><i>n.</i> <b>1.</b> polite conversation about unimportant things</React.Fragment>
    }, 
    {
      categoryUrl: 'tt', 
      categoryName: 'tableTop', 
      categoryDescription: 'Pen and paper RPGs'
    }, 
    {
      categoryUrl: 'vg', 
      categoryName: 'videoGames', 
      categoryDescription: 'Console, PC, retro'
    }
  ];

  const formatCategories = categories => {
    return categories.map((c, idx) => (
      <section key={idx}>
        <h3>
          <Link to={`/${c.categoryUrl}`}>{c.categoryName}</Link>
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