import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: { host: '0.0.0.0', allowedHosts: true },
  preview: { host: '0.0.0.0', allowedHosts: true },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three/')) {
            return 'three-core'
          }
          if (id.includes('node_modules/@react-three/drei') || id.includes('node_modules/@react-three/fiber')) {
            return 'three-r3f'
          }
          if (id.includes('node_modules/@react-three/rapier') || id.includes('@dimforge/rapier3d-compat')) {
            return 'rapier'
          }
          if (id.includes('node_modules/motion')) {
            return 'motion'
          }
          if (id.includes('node_modules/ogl')) {
            return 'ogl'
          }
          if (id.includes('node_modules/@tabler/icons-react') || id.includes('node_modules/lucide-react')) {
            return 'icons'
          }
        },
      },
    },
  },
})

