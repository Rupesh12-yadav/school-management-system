import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
<<<<<<< HEAD
  plugins: [tailwindcss()],
  server: {
    port: 3001,
    proxy: {
<<<<<<< HEAD
      
=======
    
>>>>>>> 531ea5c6004983c3dbc3a5b88c4ca867d8193586
=======
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
>>>>>>> student_model_ui
    },
  },
  server: {
    port: 3001,
    proxy: {},
  },
});
