import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative paths so `dist/` works under Live Server (/dist/...) and static hosts
  base: './',
  plugins: [
    react(),
    tailwindcss()
  ],
})
