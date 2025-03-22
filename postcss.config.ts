import autoprefixer from 'autoprefixer';
import tailwind from 'tailwindcss';
import tailwindConfig from './tailwind.config';

export const config = {
  plugins: [tailwind(tailwindConfig), autoprefixer],
};

export default config;
