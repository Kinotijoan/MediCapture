import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  env: {
    development: {
      // Make environment variables available in development mode
      REACT_APP_AUTH0_DOMAIN: true,
      REACT_APP_AUTH0_CLIENT_ID: true,
    },
  },
})
