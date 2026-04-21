import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',           // ← This fixes path issues in build
  server: {
    port: 5173,        // default Vite port (you can change if you want)
    open: true         // automatically opens browser
  }
})
