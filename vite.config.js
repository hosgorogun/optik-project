import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const glassesSrc = path.resolve(__dirname, 'gözlük resimleri')
const glassesPublic = path.resolve(__dirname, 'public/glasses')
const glassesDist = path.resolve(__dirname, 'dist/glasses')

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`[copy-glasses] Source missing: ${src}`)
    return
  }
  fs.mkdirSync(dest, { recursive: true })
  fs.cpSync(src, dest, { recursive: true, force: true })
}

/** Copies glasses images into public/dist — Windows-safe (no symlinks). */
function copyGlassesPlugin() {
  return {
    name: 'copy-glasses',
    buildStart() {
      // Dev + build: ensure public/glasses exists as a real folder
      copyDir(glassesSrc, glassesPublic)
    },
    closeBundle() {
      // Guarantee dist/glasses after Vite public copy
      copyDir(glassesSrc, glassesDist)
      console.log('[copy-glasses] Copied glasses → dist/glasses')
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
