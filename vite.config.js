import { resolve } from "path";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  plugins: [svelte()],
  root: "src/",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        productList: resolve(__dirname, "src/product-list/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        summary: resolve(__dirname, "src/checkout/index.html"),
        success: resolve(__dirname, "src/checkout/success.html"),
        login: resolve(__dirname, "src/login/index.html"),
        orders: resolve(__dirname, "src/orders/index.html"),
      },
    },
  },
  server: {
    host: "0.0.0.0",
    // port: process.env.PORT || 5173,
    port: process.env.VITE_SERVER_URL || 5173,
    proxy: {
      "/api": {
        target: "http://server-nodejs.cit.byui.edu:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
});