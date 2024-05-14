import { getLocalStorage } from "./utils.mjs";

function getCartTotal() {
  const cartItems = getLocalStorage("so-cart");
  
  if (cartItems == undefined) return;

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
    banner.remove();
  }
}

function cartTotalBanner() {
  const banner = `<div class="cart_total"><p>${getNumOfCartItems()} item(s) Total: $${getCartTotal()}</p></div>`;
  return banner;
}

function renderCartTotalBanner() {
  const banner = cartTotalBanner();
  const productDetail = document.querySelector(".product-list");
  productDetail.insertAdjacentHTML("afterend", banner);
  checkIfCartIsEmpty();
}

renderCartTotalBanner();

