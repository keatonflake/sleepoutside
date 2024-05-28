import MainFooter from "./components/MainFooter.svelte";
import MainHeader from "./components/MainHeader.svelte";
import { cartCount } from "./stores.mjs";

export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
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
  // const count = getLocalStorage("so-cart")?.length ?? 0;
  let total = 0;
  let q;

  getLocalStorage("so-cart")?.forEach(p => {
    q = p.Quantity;
    total = q + total;
    console.log("total=",total);
  });
  return total;
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

export function decrement(itemId) {
  // Retrieve the cart from local storage
  const cart = getLocalStorage("so-cart");
  if (cart) {
    // Find the index of the item with the given itemId
    const itemIndex = cart.findIndex(item => item.Id === itemId);
    // If the item is found and has a Quantity property greater than 0
    if (itemIndex !== -1 && cart[itemIndex].Quantity > 0) {
      // Decrement the quantity
      cart[itemIndex].Quantity--;
      // Update the count store
      cartCount.update(q => q - 1);
      console.log("cart item decrement", cart);
      // clear cart if quantity = 0
      if (cart[itemIndex].Quantity === 0) {
        cart.splice(itemIndex, 1);
      }
      // Update the cart back to local storage
      setLocalStorage("so-cart", cart);
    }

    // Update the cart back to local storage
    setLocalStorage("so-cart", cart);

  }
}


// export function increment() {
//   count.update((n) => n + 1);
// }

// export function reset() {
//   count.remove();
// }
