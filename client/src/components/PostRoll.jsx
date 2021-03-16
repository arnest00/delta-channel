const PostRoll = ({ posts }) => {
  const formatPosts = posts => {
    let formattedPosts = [];

    for (let i = posts.length - 1; i >= 0; i--) {
      formattedPosts.push(
        <li key={posts[i].postId}>
          {`>`}{`>`}{posts[i].postId}: {posts[i].postContent}
        </li>
      );
    };

    return formattedPosts;
  };

  return ( 
    <section>
      <ul>
        {formatPosts(posts)}
      </ul>
    </section>
  );
};
 
export default PostRoll;