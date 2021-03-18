import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';

const CategoryRoll = () => {
  return ( 
    <Router>
      <article>
        <h2>categories</h2>
          <section>
            <h3>
              <Link to='/pe'>passiveEntertainment</Link>
            </h3>
            <span className='description'>Movies and television</span>
          </section>

        <div>
          <section>
            <h3>
              <Link to='/st'>smallTalk</Link>
            </h3>
            <span className='description'><i>n.</i> <b>1.</b> polite conversation about unimportant things</span>
          </section>

          <section>
            <h3>
              <Link to='/tt'>tableTop</Link>
            </h3>
            <span className='description'>Pen and paper RPGs</span>
          </section>
          
          <section>
            <h3>
              <Link to='/vg'>videoGames</Link>
            </h3>
            <span className='description'>Console, PC, retro</span>
          </section>
        </div>
      </article>
    </Router>
  );
};

export default CategoryRoll;