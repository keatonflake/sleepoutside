import { cartCount } from "./stores.mjs";
import { getLocalStorage } from "./utils.mjs";

function getCartTotal() {
  const cartItems = getLocalStorage("so-cart");

  if (cartItems === undefined) return;

  let cartTotal = 0;
  cartItems.forEach((item) => {
    cartTotal += item.FinalPrice * item.Quantity;
  });
  return cartTotal.toFixed(2);
}

function getNumOfCartItems() {
  const cartItems = getLocalStorage("so-cart") || [];
  let numOfCartItems = 0;
  cartItems.forEach((item) => {
    numOfCartItems += item.Quantity;
  });
  return numOfCartItems;
}

function checkIfCartIsEmpty() {
  const cartItems = getLocalStorage("so-cart") || [];
  if (cartItems.length === 0) {
    const banner = document.querySelector(".cart_total");
    if (banner) {
      banner.remove();
    }
  }
}

function cartTotalBanner() {
  const banner = `<div class="cart_total"><p>Subtotal (${getNumOfCartItems()} ${
    getNumOfCartItems() === 1 ? "item" : "items"
  }): $${getCartTotal()} </p></div>`;
  return banner;
}

function renderCartTotalBanner() {
  const banner = cartTotalBanner();
  const productDetail = document.querySelector(".product-list");
  if (productDetail) {
    productDetail.insertAdjacentHTML("afterend", banner);
  }
  checkIfCartIsEmpty();
}

// Subscribe to the cartCount store and re-render the banner whenever it changes
cartCount.subscribe(() => {
  const existingBanner = document.querySelector(".cart_total");
  if (existingBanner) {
    existingBanner.remove();
  }
  renderCartTotalBanner();
});

// Initial render
// renderCartTotalBanner();
