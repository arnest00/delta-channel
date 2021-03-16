const PostForm = () => {
  const handleSubmit = e => {
    e.preventDefault();

    console.log(e);
  };

  return ( 
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='post-input'>Reply to the last post</label>
        <textarea 
          id='post-input'
          name='post-input'
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