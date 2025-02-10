import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
    },
  },
  server: {
    proxy: {
      // This will proxy requests starting with "/api" to your backend
      '/api': {
        target: 'https://hotelsync.onrender.com',  // The target backend server
        changeOrigin: true,                       // Ensures the origin is rewritten to the target's origin
        secure: false,                           // Set to true if your target server is using HTTPS
        rewrite: (path) => path.replace(/^\/api/, ''), // Optionally, remove '/api' from the request path if needed
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
