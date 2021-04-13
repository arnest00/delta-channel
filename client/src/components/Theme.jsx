const Theme = ({ themes, currentTheme }) => {
  const setTheme = theme => {
    const { themeData } = themes.find(e => e.themeShort === theme);
    
    Object.keys(themeData).forEach(d => {
      const key = `--${d}`;
      const value = themeData[d];
      document.body.style.setProperty(key, value);
    });
  };

  setTheme(currentTheme);

  return null;
};
 
export default Theme;