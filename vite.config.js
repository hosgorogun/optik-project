import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const glassesPublic = path.resolve(__dirname, 'public/glasses')
const glassesDist = path.resolve(__dirname, 'dist/glasses')

import { convertImages } from './scripts/convert-images.js'

/** Copies and converts glasses images into public/dist — Windows-safe (no symlinks). */
function copyGlassesPlugin() {
  return {
    name: 'copy-glasses',
    async buildStart() {
      // Ensure webp conversion runs automatically
      await convertImages()
    },
    closeBundle() {
      // Guarantee dist/glasses exists
      fs.mkdirSync(glassesDist, { recursive: true })
      // Copy the converted webp images from public/glasses to dist/glasses
      if (fs.existsSync(glassesPublic)) {
        fs.cpSync(glassesPublic, glassesDist, { recursive: true, force: true })
      }
      console.log('[copy-glasses] Copied converted webp glasses → dist/glasses')
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // Relative paths so `dist/` works under Live Server (/dist/...) and static hosts
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    copyGlassesPlugin(),
  ],
})
