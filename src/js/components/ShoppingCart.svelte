<script>
    import { getLocalStorage } from "../utils.mjs";
    const cartItems = getLocalStorage("so-cart") || [];
    console.log(cartItems);
</script>


<section class="Section-headerHr">
  <h2 class="shopping-cartHeader">Shopping Cart</h2>
  <div class="hr-container">
    <span class="price-text">Price</span>
    <hr class="custom-hr">
  </div>
</section>

<div class="cart-container">
  <ul class="product-list">
    {#each cartItems as item}
      <li class="cart-card divider">
        <a href="../product_pages/index.html?product={item.Id}" class="cart-card__image">
          <img
            src={item.Image}
            alt={item.Name}
          />
        </a>
        <a href="#">
          <h2 class="card__name">{item.Name}</h2>
        </a>
        <p class="cart-card__color">{item.Colors[0].ColorName}</p>
        <p class="cart-card__quantity blue"> Quantity: {item.Quantity} </p>
        <p class="cart-card__price blue">${(item.ListPrice * item.Quantity).toFixed(2)}</p>
          <div class="cart-card__buttons">
            <button class="cart-remove" id="removeFromCart" data-id="${item.Id}">Remove</button>
            <button class="cart-decrease" id="decreaseQuantity" data-id="${item.Id}">➖</button>
            <button class="cart-increase" id="increaseQuantity" data-id="${item.Id}">➕</button>
          </div>
      </li>
    {/each}
  </ul>
</div>

