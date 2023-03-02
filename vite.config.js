import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:"https://sergioere.github.io/rick-morty-app/",
  plugins: [react()],
})
