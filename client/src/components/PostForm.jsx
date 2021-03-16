const fetch = require('node-fetch');

const PostForm = () => {
  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const postContent = {
      postContent: formData.get('post-content')
    };

    fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(postContent),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.redirect('/'))
      .catch(err => console.log(err));
  };

  return ( 
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='post-content'>Reply to the last post</label>
        <textarea 
          id='post-content'
          name='post-content'
          rows='6'
          minLength='15'
          maxLength='750'
        ></textarea>
      </div>

      <button 
        type='submit'
      >
        Post
      </button>
    </form>
  );
};
 
export default PostForm;