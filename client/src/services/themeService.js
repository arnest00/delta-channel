const baseFontStack = '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';
const baseThemeDataObject = {
  'neutral-100': 'hsl(0, 0%, 96%)', 
  'neutral-200': 'hsl(0, 0%, 85%)', 
  'neutral-300': 'hsl(0, 0%, 75%)', 
  'neutral-400': 'hsl(0, 0%, 64%)', 
  'neutral-500': 'hsl(0, 0%, 54%)', 
  'neutral-600': 'hsl(0, 0%, 43%)', 
  'neutral-700': 'hsl(0, 0%, 33%)', 
  'neutral-800': 'hsl(0, 0%, 22%)', 
  'neutral-900': 'hsl(0, 0%, 12%)', 
};

const themes = [
  {
    themeShort: 'lite', 
    themeLong: 'deltaLite', 
    themeData: {
      ...baseThemeDataObject, 
      'font-stack': baseFontStack, 
      'primary-button-disabled': 'hsl(92, 42%, 57%)', 
      'primary-button': 'hsl(92, 65%, 42%)', 
      'primary-anchor': 'hsl(92, 65%, 37%)', 
      'primary-anchor-hover': 'hsl(92, 65%, 26%)', 
      'background-content': 'hsl(200, 10%, 93%)', 
      'background-body': 'hsl(200, 15%, 90%)', 
      'background-card': 'hsl(200, 15%, 85%)', 
      'background-header': 'hsl(200, 15%, 85%)', 
      'background-border': 'hsl(200, 15%, 79%)', 
      'font-button': 'hsl(0, 0%, 93%)', 
      'font-button-disabled': 'hsl(0, 0%, 79%)', 
      'font-body-subtitle': 'hsl(0, 0%, 22%)', 
      'font-body': 'hsl(0, 0%, 12%)', 
    }
  }, 
  {
    themeShort: 'dark', 
    themeLong: 'deltaDark', 
    themeData: {
      ...baseThemeDataObject, 
      'font-stack': baseFontStack, 
      'primary-anchor': 'hsl(92, 33%, 64%)', 
      'primary-anchor-hover': 'hsl(92, 53%, 49%)', 
      'primary-button': 'hsl(92, 65%, 37%)', 
      'primary-button-disabled': 'hsl(92, 65%, 26%)', 
      'background-content': 'hsl(200, 21%, 35%)',  
      'background-card': 'hsl(200, 31%, 26%)',  
      'background-border': 'hsl(200, 31%, 23%)',  
      'background-body': 'hsl(200, 31%, 20%)',  
      'background-header': 'hsl(200, 31%, 16%)',  
      'font-body': 'hsl(0, 0%, 96%)', 
      'font-button': 'hsl(0, 0%, 85%)', 
      'font-body-subtitle': 'hsl(0, 0%, 75%)', 
      'font-button-disabled': 'hsl(0, 0%, 54%)', 
    }
  }, 
];

export function getThemes() {
  return themes;
};