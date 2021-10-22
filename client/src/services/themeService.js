const baseFontStack = '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';

const themes = [
  {
    themeShort: 'lite', 
    themeLong: 'deltaLite', 
    themeData: {
      'font-stack': baseFontStack, 
      'primary-button-disabled': 'hsl(92, 42%, 57%)', 
      'primary-anchor-hover': 'hsl(92, 65%, 37%)', 
      'primary-button': 'hsl(92, 65%, 26%)', 
      'primary-anchor': 'hsl(92, 65%, 26%)', 
      'secondary': 'hsl(212, 65%, 37%)', 
      'secondary-selection': 'hsl(212, 65%, 37%)', 
      'accent-danger': 'hsl(332, 79%, 37%)', 
      'background-content': 'hsl(200, 10%, 93%)', 
      'background-body': 'hsl(200, 15%, 93%)', 
      'background-card': 'hsl(200, 15%, 88%)', 
      'background-header': 'hsl(200, 15%, 88%)', 
      'background-border': 'hsl(200, 15%, 82%)', 
      'font-button': 'hsl(0, 0%, 96%)', 
      'font-button-disabled': 'hsl(0, 0%, 75%)', 
      'font-body-subtitle': 'hsl(0, 0%, 22%)', 
      'font-body': 'hsl(0, 0%, 12%)', 
      'image-filter': 'none', 
    }
  }, 
  {
    themeShort: 'dark', 
    themeLong: 'deltaDark', 
    themeData: {
      'font-stack': baseFontStack, 
      'primary-anchor': 'hsl(92, 33%, 64%)', 
      'primary-anchor-hover': 'hsl(92, 53%, 49%)', 
      'primary-button': 'hsl(92, 65%, 37%)', 
      'primary-button-disabled': 'hsl(92, 65%, 26%)', 
      'secondary': 'hsl(333, 21%, 76%)', 
      'secondary-selection': 'hsl(332, 79%, 37%)', 
      'accent-danger': 'hsl(332, 79%, 37%)', 
      'background-content': 'hsl(200, 21%, 35%)',  
      'background-card': 'hsl(200, 31%, 26%)',  
      'background-border': 'hsl(200, 31%, 23%)',  
      'background-body': 'hsl(200, 31%, 20%)',  
      'background-header': 'hsl(200, 31%, 16%)',  
      'font-body': 'hsl(0, 0%, 96%)', 
      'font-button': 'hsl(0, 0%, 96%)', 
      'font-body-subtitle': 'hsl(0, 0%, 75%)', 
      'font-button-disabled': 'hsl(0, 0%, 54%)', 
      'image-filter': 'brightness(0.9)'
    }
  }, 
  {
    themeShort: 'yeti', 
    themeLong: 'iceWalker', 
    themeData: {
      'font-stack': baseFontStack, 
      'primary-button-disabled': 'hsl(210, 34%, 63%)', 
      'primary-anchor-hover': 'hsl(210, 34%, 63%)', 
      'primary-button': 'hsl(213, 32%, 52%)', 
      'primary-anchor': 'hsl(213, 32%, 52%)', 
      'secondary': 'hsl(311, 20%, 63%)', 
      'secondary-selection': 'hsl(311, 20%, 63%)', 
      'accent-danger': 'hsl(354, 42%, 56%)', 
      'background-content': 'hsl(218, 27%, 94%)',  
      'background-body': 'hsl(218, 27%, 94%)',  
      'background-card': 'hsl(218, 27%, 92%)',  
      'background-header': 'hsl(218, 27%, 92%)',  
      'background-border': 'hsl(219, 28%, 88%)',  
      'font-button': 'hsl(218, 27%, 94%)', 
      'font-button-disabled': 'hsl(219, 28%, 88%)', 
      'font-body-subtitle': 'hsl(222, 16%, 28%)', 
      'font-body': 'hsl(220, 16%, 22%)', 
      'image-filter': 'none'
    }
  }, 
  {
    themeShort: 'vamp', 
    themeLong: 'nightCreature', 
    themeData: {
      'font-stack': baseFontStack, 
      'primary-anchor': 'hsl(265, 89%, 78%)', 
      'primary-anchor-hover': 'hsl(265, 40%, 68%)', 
      'primary-button': 'hsl(265, 40%, 49%)', 
      'primary-button-disabled': 'hsl(266, 40%, 29%)', 
      'secondary': 'hsl(31, 100%, 71%)', 
      'secondary-selection': 'hsl(31, 100%, 62%)', 
      'accent-danger': 'hsl(0, 100%, 67%)', 
      'background-content': 'hsl(232, 13%, 31%)',  
      'background-card': 'hsl(232, 14%, 27%)',  
      'background-border': 'hsl(232, 14%, 24%)',  
      'background-body': 'hsl(231, 15%, 21%)',  
      'background-header': 'hsl(231, 15%, 18%)',  
      'font-body': 'hsl(60, 30%, 96%)', 
      'font-button': 'hsl(60, 30%, 96%)', 
      'font-body-subtitle': 'hsl(60, 30%, 96%)', 
      'font-button-disabled': 'hsl(60, 30%, 75%)', 
      'image-filter': 'brightness(0.9)'
    }
  }, 
];

export function getThemes() {
  return themes;
};