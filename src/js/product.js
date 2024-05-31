// import ShoppingCart from "./components/ShoppingCart.svelte";
// import { loadHeaderFooter } from "./utils.mjs";

import { getParam, loadHeaderFooter } from "./utils.mjs";
import productDetails from "./productDetails.mjs";


loadHeaderFooter();

// new ShoppingCart({
//   target: document.querySelector(".products"),

// });

const productId = getParam("product");
productDetails(productId, ".product-detail");