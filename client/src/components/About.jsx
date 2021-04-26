const About = () => {
  return ( 
    <article className='About container'>
      <h2>about</h2>

      <div className='about-container'>
      <section className='rules'>
          <h3>rules</h3>
          <p>By posting on deltaChannel, you agree that you will follow these rules. Otherwise, the offending post(s) may be deleted.</p>
          <ol>
            <li>You will not post anything that violates local or United States law.</li>
            <li>You will not dox anyone, or incite raids on other websites.</li>
            <li>You will not spam the website or otherwise contribute low-quality or off-topic posts.</li>
            <li>You will not advertise on the website.</li>
            <li>You will assume ignorance before malice, especially if discussing controversial or sensitive topics.</li>
            <li>You will be respectful to other deltaChannel users.</li>
          </ol>
        </section>

        <section className='faqs'>
          <h3>faqs</h3>
          <section>
            <h4>What is deltaChannel?</h4>
            <p>deltaChannel is an anonymous textboard, developed with the MERN stack. Users are able to participate in the community and discuss particular topics without the usual barrier of account registration.</p>
          </section>
          <section>
            <h4>Does deltaChannel collect personal information?</h4>
            <p>deltaChannel does not collect or store user information. Any deleted posts are removed from our database.</p>
          </section>
        </section>
      </div>
    </article>
  );
};
 
export default About;