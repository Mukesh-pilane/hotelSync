import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',  // Automatically update service worker
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'HotelSync',
        short_name: 'HotelSync',
        description: 'Hotel management application',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',  // Ensures full-screen experience on mobile
        icons: [
          {
            src: '/hoteSync.png',  // Icon path, should be inside the 'public' directory
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/hoteSync.png',  // Icon path, should be inside the 'public' directory
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/hoteSync.png',  // Maskable icon
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',  // For devices that support maskable icons
          },
        ],
      },
      devOptions: {
        enabled: true,  // Enable PWA during development (optional)
      },
    }),
  ],
  resolve: {
    alias: {
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
    },
  },
  server: {
    host: '0.0.0.0',  // Allow access from other devices on the same network
    port: 4173,        // Change to your preferred port
    proxy: {
      // This will proxy requests starting with "/api" to your backend
      '/api': {
        target: 'https://hotelsync.onrender.com',  // Your backend server URL
        changeOrigin: true,                       // Ensures the origin is rewritten to the target's origin
        secure: false,                           // Set to true if your target server is using HTTPS
        rewrite: (path) => path.replace(/^\/api/, ''),  // Optionally, remove '/api' from the request path if needed
        configure: (proxy, options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Request sent to target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Response received from target:', proxyRes.statusCode, req.url);
          });
        },
      }
    }
  }
})
