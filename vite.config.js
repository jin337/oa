import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { defineConfig } from 'vite'

import viteFederation from '@originjs/vite-plugin-federation'
import viteTailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'
import vitePluginImageTools from 'vite-plugin-image-tools'

export default defineConfig({
  server: {
    open: true,
    port: 3003,
    host: '0.0.0.0',
  },
  preview: {
    open: true,
    port: 3003,
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      src: resolve('src'),
    },
  },
  plugins: [
    react(),
    viteTailwindcss(),
    vitePluginImageTools({
      quality: 70,
      enableWebp: true,
    }),
    viteFederation({
      name: 'projectApp',
      filename: 'remoteEntry.js',
      exposes: {
        './apply': './src/pages/apply.jsx',
        './todo': './src/pages/todo.jsx',
        './trace': './src/pages/trace.jsx',
        './archive': './src/pages/archive.jsx',
        './draft': './src/pages/draft.jsx',
        './all': './src/pages/all.jsx',
      },
      shared: ['react', 'react-dom', 'react-router', 'react-redux', '@reduxjs/toolkit', 'axios'],
    }),
    viteCompression({ threshold: 10240 }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: 'terser',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/chunks/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
})
