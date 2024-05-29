import ProductList from "./components/ProductList.svelte";
import { loadHeaderFooter, updateCartItem   } from "./utils.mjs";

loadHeaderFooter();
// decrement();


new ProductList({
  target: document.querySelector(".products"),
  props: { category: "tents" },
});


// Example usage for updating cart items (to be replaced with your actual event handling logic)
updateCartItem("someItemId", true); 
// for incrementing
updateCartItem("someItemId", false); 
// for decrementing