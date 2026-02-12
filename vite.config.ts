import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Vercel 환경변수나 .env 파일의 API_KEY를 process.env.API_KEY로 접근 가능하게 설정
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  };
});