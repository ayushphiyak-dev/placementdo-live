import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // Use VITE_API_PORT env var or fall back to 3000 (port used by `vercel dev`)
        target: `http://localhost:${process.env.VITE_API_PORT || 3000}`,
        changeOrigin: true,
      },
    },
  },
})
