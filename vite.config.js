import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

import { resolve } from 'path'
import compression from 'vite-plugin-compression'

import federation from '@originjs/vite-plugin-federation'

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
    tailwindcss(),
    compression({ threshold: 10240 }),
    federation({
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
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
