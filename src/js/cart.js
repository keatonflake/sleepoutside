import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  let productPrice = item.ListPrice;
  let numOfProducts = item.Quantity;
  let total = productPrice * numOfProducts;
  console.log(productPrice);
  console.log(numOfProducts);

  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity"> Quantity: ${item.Quantity} </p>
  <p class="cart-card__price">$${total}</p>
</li>`;

  return newItem;
}

renderCartContents();