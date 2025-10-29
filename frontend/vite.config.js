import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 3001,
    proxy: {
<<<<<<< HEAD
      
=======
    
>>>>>>> 531ea5c6004983c3dbc3a5b88c4ca867d8193586
    },
  },
});
