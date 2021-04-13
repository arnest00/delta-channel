import React from 'react';

const categories = [
  {
    categorySlug: 'mp', 
    categoryName: 'movingPictures', 
    categoryDescription: 'Movies, television, streaming'
  }, 
  {
    categorySlug: 'st', 
    categoryName: 'smallTalk', 
    categoryDescription: <React.Fragment><i>n.</i> <b>1.</b> polite conversation about unimportant things</React.Fragment>
  }, 
  {
    categorySlug: 'vg', 
    categoryName: 'videoGames', 
    categoryDescription: 'Console, PC, retro'
  }, 
  {
    categorySlug: 'tb', 
    categoryName: 'testBoard', 
    categoryDescription: 'Test posting on deltaChannel'
  }
];

export function getCategories() {
  return categories;
};