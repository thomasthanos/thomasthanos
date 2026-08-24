import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// Base path is overridable so the same build can ship to a custom domain
// (thomasthanos.uk) or to a GitHub Pages subpath. Default: root.
const base = process.env.VITE_BASE ?? '/'

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router')) return 'router'
            if (id.includes('react-dom') || id.includes('/react/')) return 'react'
            if (id.includes('lucide-react')) return 'icons'
            return undefined
          }
          // Project copy changes far more often than component code; its own
          // chunk keeps one from busting the other's cache.
          if (id.includes('/src/data/projects/')) return 'projects-data'
          return undefined
        },
      },
    },
  },
})
