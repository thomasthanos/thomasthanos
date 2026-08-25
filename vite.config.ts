import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

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
    assetsInlineLimit: (file) =>
      /\.(woff2?|ttf|otf|eot)$/i.test(file) ? false : undefined,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router')) return 'router'
            if (id.includes('react-dom') || id.includes('/react/')) return 'react'
            if (id.includes('lucide-react')) return 'icons'
            return undefined
          }
          if (id.includes('/src/data/projects/')) return 'projects-data'
          return undefined
        },
      },
    },
  },
})
