import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import galleryPlugin from './vite-plugin-gallery'

export default defineConfig({
  plugins: [react(), galleryPlugin()],
})
