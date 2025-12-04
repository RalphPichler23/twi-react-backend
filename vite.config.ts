import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@utils/types': path.resolve(__dirname, './src/utils/types'),
      '@state': path.resolve(__dirname, './src/zustand/index.ts'),
      '@routes': path.resolve(__dirname, './src/navigation/routes.ts'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@navigation': path.resolve(__dirname, './src/navigation'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
})
