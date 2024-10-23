import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {
    proxy :{
      "/api":"https://aa214c91-00d3-4499-b8f1-96124bef7bcb.e1-us-east-azure.choreoapps.dev"
    },
  }
})
