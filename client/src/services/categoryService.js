import React from 'react';
import movingpicturesBanner from '../assets/images/movingpictures-banner.jpg';
import smalltalkBanner from '../assets/images/smalltalk-banner.jpg';
import videogamesBanner from '../assets/images/videogames-banner.jpg';
import testboardBanner from '../assets/images/testboard-banner.jpg';

const categories = [
  {
    categorySlug: 'mp', 
    categoryName: 'movingPictures', 
    categoryDescription: 'Movies, television, streaming', 
    categoryBanner: movingpicturesBanner
  }, 
  {
    categorySlug: 'st', 
    categoryName: 'smallTalk', 
    categoryDescription: <React.Fragment><i>n.</i> <b>1.</b> polite conversation about unimportant things</React.Fragment>, 
    categoryBanner: smalltalkBanner
  }, 
  {
    categorySlug: 'vg', 
    categoryName: 'videoGames', 
    categoryDescription: 'Console, PC, retro', 
    categoryBanner: videogamesBanner
  }, 
  {
    categorySlug: 'tb', 
    categoryName: 'testBoard', 
    categoryDescription: 'Test posting on deltaChannel', 
    categoryBanner: testboardBanner
  }
];

export function getCategories() {
  return categories;
};