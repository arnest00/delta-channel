const themes = [
  {
    themeShort: 'lite', 
    themeLong: 'delta-lite', 
    themeData: {
      'primary-color': 'black', 
      'background-color': 'white'
    }
  }, 
  {
    themeShort: 'dark', 
    themeLong: 'delta-dark', 
    themeData: {
      'primary-color': 'green', 
      'background-color': 'black'
    }
  }, 
  {
    themeShort: 'city', 
    themeLong: 'one-point-oh', 
    themeData: {
      'primary-color': 'magenta', 
      'background-color': 'cyan'
    }
  }, 
  {
    themeShort: 'hulk', 
    themeLong: 'true-american', 
    themeData: {
      'primary-color': 'red', 
      'background-color': 'yellow'
    }
  }, 
];

export function getThemes() {
  return themes;
};