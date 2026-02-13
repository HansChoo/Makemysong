import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    define: {
      // Correctly inject the API KEY. Using || '' ensures it doesn't crash if undefined.
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
    },
  };
});