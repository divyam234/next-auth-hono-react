import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    // proxy: {
    //   "/api": "http://localhost:5000",
    // },
    port: 3000,
  },
})
