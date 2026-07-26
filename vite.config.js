import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // GitHub Pages serves from the domain root (CNAME), so base '/' is correct.
  base: '/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: null, // Registrierung erfolgt manuell in main.js via virtual:pwa-register
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,json,ico}'],
        navigateFallback: '/index.html',
        // Firebase wird nur bei aktiviertem Sync per dynamischem Import geladen.
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024
      },
      manifest: false // bestehende public/manifest.json wird weiterverwendet
    })
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
