import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    define: {
      // Correctly inject the API KEY without breaking other process.env usages
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  };
});