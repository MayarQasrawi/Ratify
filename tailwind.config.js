


export default {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}', 
    './index.html'
    // Include all JS/JSX/TS/TSX files in src
  ],
  theme: {
    extend: {colors: {
      'main-color': '#2563eb', // أزرق Tailwind افتراضي
      'secondary-color': '#1e40af', // أزرق غامق
      'text-color': '#333333',
      'tabe-border': '#e5e7eb',
    },
  },
  },
  plugins: [],
};

