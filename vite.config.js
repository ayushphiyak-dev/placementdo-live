import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import process from 'node:process'
import { homeContent } from './src/data/publicHome.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'public-home-content',
    transformIndexHtml(html) {
      const css = readFileSync(new URL('./src/components/Public/learning-home.css', import.meta.url), 'utf8');
      return html.replace('<!-- PUBLIC_HOME -->', homeContent)
        .replace('</head>', '<style>' + css + '</style></head>');
    },
  }],
  build: {},
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
