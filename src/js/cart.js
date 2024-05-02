import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  let transformedCartItems;

  // Check if cartItems is an array
  if (!Array.isArray(cartItems)) {
    // If cartItems is not an array, convert it to an array
    const cartItemsArray = cartItems ? [cartItems] : [];
    // Now you can use map() safely on cartItemsArray
    transformedCartItems = cartItemsArray.map((item) => {
      // Transformation logic
      return cartItemTemplate(item);
    });
  } else {
    // If cartItems is already an array, you can directly use map() on it
    transformedCartItems = cartItems.map((item) => {
      // Transformation logic
      return cartItemTemplate(item);
    });
  }

  // Set the innerHTML after mapping is done
  document.querySelector(".product-list").innerHTML = transformedCartItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
  return newItem;
}

renderCartContents();
