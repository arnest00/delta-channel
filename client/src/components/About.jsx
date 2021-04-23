const About = () => {
  return ( 
    <article className='About container'>
      <h2>about</h2>

      <div className='about-container'>
      <section className='rules'>
          <h3>rules</h3>
          <p>By posting on deltaChannel, you agree that you will follow these rules. Otherwise, the offending post will be deleted.</p>
          <ol>
            <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</li>
            <li>Lorem ipsum dolor sit amet consectetur.</li>
            <li>Lorem ipsum dolor sit amet consectetur. Nihil nisi officia aliquid!</li>
          </ol>
        </section>

        <section className='faqs'>
          <h3>faqs</h3>
          <section>
            <h4>What is deltaChannel?</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, a possimus sunt dicta ex optio quis harum laborum nobis sed aliquid nam. Magni, quo accusantium? Laboriosam deleniti nobis aut eligendi.</p>
          </section>
          <section>
            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit?</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, eum accusantium, quam quia voluptatem in dolores necessitatibus optio reiciendis eveniet repellendus, saepe accusamus laborum et magnam recusandae ipsa officiis sequi.</p>
          </section>
        </section>
      </div>
    </article>
  );
};
 
export default About;