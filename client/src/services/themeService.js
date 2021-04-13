const themes = [
  {
    themeShort: 'lite', 
    themeLong: 'delta-lite', 
    themeData: {
      'primary-color': 'blue'
    }
  }, 
  {
    themeShort: 'dark', 
    themeLong: 'delta-dark', 
    themeData: {
      'primary-color': 'green'
    }
  }, 
  {
    themeShort: 'city', 
    themeLong: 'one-point-oh', 
    themeData: {
      'primary-color': 'teal'
    }
  }, 
  {
    themeShort: 'hulk', 
    themeLong: 'true-american', 
    themeData: {
      'primary-color': 'red'
    }
  }, 
];

export function getThemes() {
  return themes;
};