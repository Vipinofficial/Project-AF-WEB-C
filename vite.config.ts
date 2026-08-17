import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Fixed so the two web apps can run side by side, and so the merchant link
    // in Home.tsx (http://localhost:5174) resolves during development.
    port: 5173,
    strictPort: true,
  },
})
