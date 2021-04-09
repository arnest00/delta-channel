const Title = ({ path, categories }) => {
  const setTitle = path => {
    for (let i = 0; i < categories.length; i++) {
      if (path === categories[i].categorySlug) {
        return document.title = `${categories[i].categoryName} - deltaChannel`;
      };
    };

    document.title = 'deltaChannel';
  };

  setTitle(path);

  return null;
};
 
export default Title;