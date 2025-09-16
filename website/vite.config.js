import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  base: '/launchpad-toggle/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})