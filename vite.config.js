import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target:
          "https://4000-kacto1973-invictusbacke-ixur9tgp4m8.ws-us118.gitpod.io",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
