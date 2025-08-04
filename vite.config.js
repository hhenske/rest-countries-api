import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/rest-countries-api/', // 👈 Add this line
  plugins: [react()],
  base: 'rest-countries-app'
})
