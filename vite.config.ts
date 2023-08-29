/// <reference types="vitest" />
import eslintPlugin from '@nabla/vite-plugin-eslint';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => ({
  optimizeDeps: {
    exclude: []
  },
  test: {
    css: false,
    include: ['src/**/__tests__/*'],
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.ts',
    clearMocks: true,
    coverage: {
      provider: 'istanbul',
      enabled: true,
      '100': true,
      reporter: ['text', 'lcov'],
      reportsDirectory: 'coverage'
    }
  },
  server: {
    watch: {
      usePolling: true
    },
    host: true,
    strictPort: true,
    port: 8899,
    proxy: {
      // "/api": {
      //   target: "http://localhost:33160",
      //   changeOrigin: true,
      //   secure: false,
      // },
    //   "/api-background": {
    //     target: "http://localhost:33160",
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   "/ssr": {
    //     target: "http://localhost:33160",
    //     changeOrigin: true,
    //     secure: false,
      },
  },
  plugins: [
    svgr(),
    tsconfigPaths(),
    react(),
    ...(mode === 'test'
      ? []
      : [
          eslintPlugin(),
          VitePWA({
            registerType: 'autoUpdate',
            includeAssets: [
              'favicon.png',
              'robots.txt',
              'apple-touch-icon.png',
              'icons/*.svg'
            ],
            manifest: {
              theme_color: '#BD34FE',
              icons: [
                {
                  src: '/android-chrome-192x192.png',
                  sizes: '192x192',
                  type: 'image/png',
                  purpose: 'any maskable'
                },
                {
                  src: '/android-chrome-512x512.png',
                  sizes: '512x512',
                  type: 'image/png'
                }
              ]
            }
          })
        ])
  ]
}));
