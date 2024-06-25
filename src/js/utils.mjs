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

export function getCartTotal() {
  const cartItems = getLocalStorage("so-cart");

  if (cartItems === undefined) return;

  let cartTotal = 0;
  cartItems.forEach((item) => {
    cartTotal += item.FinalPrice * item.Quantity;
  });
  return cartTotal.toFixed(2);
}


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

export function alertMessage(messages, scroll = true, duration = 3000) {
      const mainElement = document.querySelector("main");
      const alertContainer = document.createElement("div");
      alertContainer.className = "alert-container";
    
      const messageElements = Array.isArray(messages)
        ? messages.map((message) => `<div class="alert2"><div class="alert2-content"><span>${message}</span><button class="alert2-close">&times;</button></div></div>`)
        : [`<div class="alert2"><div class="alert2-content"><span>${messages}</span><button class="alert2-close">&times;</button></div></div>`];
    
      alertContainer.innerHTML = messageElements.join("");
      mainElement.parentNode.insertBefore(alertContainer, mainElement);
    
      document.querySelectorAll(".alert2-close").forEach((closeButton) => {
        closeButton.addEventListener("click", () => {
          closeButton.parentElement.parentElement.remove();
        });
      });
    
      if (scroll) {
        window.scrollTo(0, 0);
      }
    
      setTimeout(() => {
        alertContainer.remove();
      }, duration);
    }

    export function filterProducts(products, searchTerm) {
      if (!searchTerm) return products;
      
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      return products.filter(product => 
        product.Name.toLowerCase().includes(lowercaseSearchTerm) ||
        product.NameWithoutBrand.toLowerCase().includes(lowercaseSearchTerm) ||
        product.Brand.Name.toLowerCase().includes(lowercaseSearchTerm)
      );
    }
  
// styles for the alert
const style = document.createElement("style");
style.innerHTML = `
 .alert-container {
  // position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.alert2 {
  background-color: #f8d7da;
  color: #721c24;
  padding: 15px;
  position: relative;
  margin-bottom: 10px;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 90%;
  width: 500px;
  box-sizing: border-box;
}

.alert2-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.alert2-content span {
  font-weight: 500;
  font-size: 16px;
  flex-grow: 1;
}

.alert2-close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  margin-left: 10px;
}

.alert2-close:hover {
  color: #721c24;
}
`;
document.head.appendChild(style);



// Call attachEventListeners once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", attachEventListeners);
