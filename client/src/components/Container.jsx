import PostForm from './PostForm';
import PostRoll from './PostRoll';

const Container = () => {
  return ( 
    <section>
      <PostForm 
        onClick={() => console.log('Click!')}
      />
      <PostRoll />
    </section>
  );
};
 
export default Container;