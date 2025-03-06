/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
/// <reference types="vitest" />
import importMetaEnv from '@import-meta-env/unplugin';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

import svgr from 'vite-plugin-svgr';

// @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
export default async ({ mode }) => {
  // NOTE: This is used to load environment variables from ".env" into "process.env" to be used in "vite.config.ts"
  // process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT

  /* Includes both process.env and .env variables */
  const environment = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    root: __dirname,
    optimizeDeps: {
      exclude: [],
    },
    resolve: {
      dedupe: ['react-router-dom'],
    },
    // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
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
        reportsDirectory: 'coverage',
      },
    },
    server: {
      watch: {
        usePolling: true,
      },
      host: true,
      strictPort: true,
      port: Boolean(Number(environment.SBL_DEV_PORT))
        ? Number(environment.SBL_DEV_PORT)
        : 8899,
    },
    plugins: [
      svgr(),
      tsconfigPaths(),
      react(),
      ...(mode === 'test'
        ? []
        : [
            importMetaEnv.vite({ example: '.env.example.public' }),
            eslintPlugin(),
            VitePWA({
              registerType: 'autoUpdate',
              includeAssets: [
                'icons8-usa-96',
                'favicon.png',
                'robots.txt',
                'apple-touch-icon.png',
                'icons/*.svg',
              ],
              manifest: {
                icons: [
                  {
                    src: '/android-chrome-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                    purpose: 'any maskable',
                  },
                  {
                    src: '/android-chrome-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                  },
                ],
              },
            }),
          ]),
    ],
  });
};
