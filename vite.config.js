import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'apple-touch-icon.png'],
      manifest: {
        name: process.env.VITE_SITE_TITLE || 'Food Junction | Hanumangarh Town Bazar',
        short_name: process.env.VITE_SITE_SHORT_NAME || 'Food Junction',
        description:
          process.env.VITE_SITE_DESCRIPTION ||
          "Food Junction Town, opposite Central Park in Hanumangarh Town Bazar. Pizza, Indo-Chinese, burgers, pasta and more. Call, get directions or order on Zomato/Swiggy.",
        theme_color: process.env.VITE_THEME_COLOR || '#e0632a',
        background_color: '#1c140d',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        lang: 'en',
        categories: ['food', 'restaurant', 'lifestyle'],
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === 'https://www.google.com' && url.pathname.startsWith('/maps'),
            handler: 'NetworkOnly',
          },
        ],
      },
    }),
  ],
})
