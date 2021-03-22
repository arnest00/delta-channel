const Header = ({ title }) => {
  return ( 
    <header id="header">
      <h1>{title} <span role='img' aria-label={'up-pointing red triangle'}>🔺</span></h1>
    </header>
  );
};
 
export default Header;