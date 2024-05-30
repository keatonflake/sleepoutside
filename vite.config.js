import { resolve } from "path";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte()],
  root: "src/",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        // product: resolve(__dirname, "src/product_pages/index.html"),
        product_list: resolve(__dirname, "src/product-list/index.html"),  // page to list all products
        product: resolve(__dirname, "src/product_pages/index.html")
      },
    },
  },
});
