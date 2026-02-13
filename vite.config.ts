import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    define: {
      // Prevent "process is not defined" error in browser
      'process.env': {}, 
      // Correctly inject the API KEY.
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
    },
  };
});