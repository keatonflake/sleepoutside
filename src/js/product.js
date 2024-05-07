import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart") || [];

  // Check if the product already exists in the cart
  const existingProductIndex = cartItems.findIndex(
    (cartItem) => cartItem.Id === product.Id
  );

  if (existingProductIndex !== -1) {
    // If the product already exists, increment its quantity
    cartItems[existingProductIndex].Quantity += 1;
  } else {
    // If the product doesn't exist, add it to the cart with a quantity of 1
    product.Quantity = 1;
    cartItems.push(product);
  }

  // Store the updated cart items in local storage
  setLocalStorage("so-cart", cartItems);
}

// add to cart button event handler
async function addToCartHandler(e) {
  console.log("e.target.dataset.id has the id variable", e.target.dataset.id);
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
  console.log("Prints the product object to the console", product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);