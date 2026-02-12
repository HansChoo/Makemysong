import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // We use (process as any) to avoid TypeScript errors with cwd() in some environments.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Expose env variables to the client-side code
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  };
});