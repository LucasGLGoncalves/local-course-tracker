import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // 👇 Isso aqui resolve o problema de refresh na rota
  base: '/',
  define: {
    'process.env': {},
  },
  appType: 'spa'
})
