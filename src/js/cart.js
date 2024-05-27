import ShoppingCart from "./components/ShoppingCart.svelte";
import { loadHeaderFooter } from "./utils.mjs";
// import { removeFromCart  } from "./productDetails.mjs";


loadHeaderFooter();

new ShoppingCart({
  target: document.querySelector(".products"),

});