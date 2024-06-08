import MainFooter from "./components/MainFooter.svelte";
import MainHeader from "./components/MainHeader.svelte";
import { cartCount } from "./stores.mjs";

export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

getLocalStorage

// Save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function getCartCount() {
  let total = 0;
  getLocalStorage("so-cart")?.forEach(p => {
    total += p.Quantity;
  });
  return total;
}

// export function getDiscountedPrice(product) {
//   console.log("20% discount() was called")
//   console.log(product.FinalPrice) // returns the actual final price
//   let FinalPrice = product.FinalPrice - (product.FinalPrice * 0.2)
//   let ListPrice = product.ListPrice
//   if (!product.isClearance === true) {
//     return FinalPrice
//   } else {
//     return ListPrice;
//   }
// }


export function getDiscountedPrice(product) {
  let finalPrice = product.FinalPrice;
  let listPrice = product.ListPrice;
  if (product.IsClearance) {
    console.log("20% discount() was called");
    console.log(product.FinalPrice);
    finalPrice = product.FinalPrice - (product.FinalPrice * 0.2);
  }
  // If no discount is applied, return the original price
  return {
    finalPrice: finalPrice,
    listPrice: product.IsClearance ? listPrice : 0,
  };
}

export function loadHeaderFooter() {
  new MainHeader({
    target: document.querySelector("#main-header"),
    props: { cartCount: getCartCount() },
  });
  new MainFooter({
    target: document.querySelector("#main-footer"),
  });
}


export function removeItem(itemId) {
  let cart = getLocalStorage("so-cart") || [];
  cart = cart.filter(item => item.Id !== itemId);
  setLocalStorage("so-cart", cart);
  updateCartCount();
}

export function updateCartItem(itemId, increment = true) {
  let cart = getLocalStorage("so-cart") || [];
  const itemIndex = cart.findIndex(item => item.Id === itemId);

  if (itemIndex !== -1) {
    if (increment) {
      cart[itemIndex].Quantity++;
    } else {
      if (cart[itemIndex].Quantity > 1) {
        cart[itemIndex].Quantity--;
      } else {
        cart.splice(itemIndex, 1);
      }
    }
    setLocalStorage("so-cart", cart);
    updateCartCount();
  } else {
    console.log("Item not found in cart");
  }
}

export function updateCartCount() {
  cartCount.set(getCartCount());
}

export function attachEventListeners() {
  document.querySelectorAll("#removeFromCart").forEach(button => {
    button.addEventListener("click", (event) => {
      removeItem(event.currentTarget);
    });
  });

  document.querySelectorAll("#decreaseQuantity").forEach(button => {
    button.addEventListener("click", (event) => {
      const itemId = event.currentTarget.getAttribute("data-id");
      updateCartItem(itemId, false);
    });
  });

  document.querySelectorAll("#increaseQuantity").forEach(button => {
    button.addEventListener("click", (event) => {
      const itemId = event.currentTarget.getAttribute("data-id");
      updateCartItem(itemId, true);
    });
  });
}

// Call attachEventListeners once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", attachEventListeners);
