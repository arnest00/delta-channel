const PostRoll = ({ posts }) => {
  const formatPosts = posts => {
    let formattedPosts = [];

    for (let i = posts.length - 1; i >= 0; i--) {
      formattedPosts.push(
        <section key={posts[i].postId}>
          {`>>`}{posts[i].postId}: {posts[i].postContent}
        </section>
      );
    };

    return formattedPosts;
  };

  return ( 
    <article>
      {formatPosts(posts)}
    </article>
  );
};
 
export default PostRoll;