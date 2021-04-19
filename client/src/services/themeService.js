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
    themeLong: 'delta-lite', 
    themeData: {
      ...baseThemeDataObject, 
      'font-stack': baseFontStack, 
      'primary-300': 'hsl(88, 50%, 53%)', 
      'primary-500': 'hsl(92, 48%, 42%)', 
      'primary-700': 'hsl(103, 56%, 26%)', 
      'background-100': 'hsl(0, 0%, 96%)',  
      'background-200': 'hsl(0, 0%, 85%)',  
      'background-300': 'hsl(0, 0%, 75%)',  
      'font-700': 'hsl(0, 0%, 33%)', 
      'font-800': 'hsl(0, 0%, 22%)', 
      'font-900': 'hsl(0, 0%, 12%)', 
    }
  }, 
  {
    themeShort: 'dark', 
    themeLong: 'delta-dark', 
    themeData: {
      ...baseThemeDataObject, 
      'font-stack': baseFontStack, 
      'primary-300': 'hsl(88, 50%, 53%)', 
      'primary-500': 'hsl(92, 48%, 42%)', 
      'primary-700': 'hsl(103, 56%, 26%)', 
      'background-100': 'hsl(200, 19%, 18%)',  
      'background-200': 'hsl(199, 18%, 33%)',  
      'background-300': 'hsl(200, 18%, 26%)',  
      'font-700': 'hsl(0, 0%, 88%)', 
      'font-800': 'hsl(0, 0%, 93%)', 
      'font-900': 'hsl(0, 0%, 96%)', 
    }
  }, 
  {
    themeShort: 'city', 
    themeLong: 'one-point-oh', 
    themeData: {
      ...baseThemeDataObject, 
      'font-stack': '"Courier", monospace', 
      'primary-300': 'hsl(54, 100%, 73%)', 
      'primary-300': 'hsl(54, 100%, 62%)', 
      'primary-700': 'hsl(54, 100%, 67%)', 
      'background-100': 'hsl(0, 0%, 13%)',  
      'background-200': 'hsl(0, 0%, 13%)',  
      'background-300': 'hsl(0, 0%, 13%)',  
      'font-700': 'hsl(187, 71%, 82%)', 
      'font-800': 'hsl(187, 72%, 71%)', 
      'font-900': 'hsl(187, 71%, 59%)', 
    }
  }, 
  {
    themeShort: 'hulk', 
    themeLong: 'true-american', 
    themeData: {
      ...baseThemeDataObject, 
      'font-stack': '"Impact", sans-serif', 
      'primary-300': 'hsl(0, 0%, 33%)',  
      'primary-500': 'hsl(0, 0%, 22%)',  
      'primary-700': 'hsl(0, 0%, 12%)',  
      'background-100': 'hsl(54, 100%, 88%)', 
      'background-200': 'hsl(54, 100%, 81%)', 
      'background-300': 'hsl(54, 100%, 73%)', 
      'font-700': 'hsl(14, 91%, 54%)', 
      'font-800': 'hsl(14, 80%, 50%)', 
      'font-900': 'hsl(14, 82%, 46%)', 
    }
  }, 
];

export function getThemes() {
  return themes;
};