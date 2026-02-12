import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Prevent 'process is not defined' error by defining it as an object
      'process.env': JSON.stringify({}),
      // Explicitly define the API KEY
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  };
});