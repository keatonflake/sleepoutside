<script>
  import { getLocalStorage, removeItem, updateCartItem } from "../utils.mjs";

  let cartItems = getLocalStorage("so-cart") || [];

  $: cartItems = getLocalStorage("so-cart") || [];

  function handleRemoveItem(itemId) {
    removeItem(itemId);
    console.log("Item removed from cart was called");
    cartItems = getLocalStorage("so-cart") || [];
  }

  function handleUpdateCartItem(itemId, increment) {
    updateCartItem(itemId, increment);
    cartItems = getLocalStorage("so-cart") || [];
  }
</script>

<section class="Section-headerHr">
  <h2 class="shopping-cartHeader">Shopping Cart</h2>
  <div class="hr-container">
    <span class="price-text">Price</span>
    <hr class="custom-hr" />
  </div>
</section>

<div class="cart-container">
  <ul class="product-list">
    {#each cartItems as item (item.Id)}
      <li class="cart-card divider">
        <a href="../product_pages/index.html?product={item.Id}" class="cart-card__image">
          <img src={item.Image} alt={item.Name} />
        </a>
        <a href="#">
          <h2 class="card__name">{item.Name}</h2>
        </a>
        <p class="cart-card__color">{item.Colors[0].ColorName}</p>
        <p class="cart-card__quantity blue">Quantity: {item.Quantity}</p>
        <p class="cart-card__price blue">${(item.ListPrice * item.Quantity).toFixed(2)}</p>
        <div class="cart-card__buttons">
          <!-- <button class="cart-remove" data-id={item.Id} id="removeFromCart">Remove</button> -->
          <button class="cart-remove" on:click={() => handleRemoveItem(item.Id)} id="removeFromCart">Remove</button>
          <!-- <button class="cart-remove" on:click={() => handleRemoveItem(item.Id)}>Remove</button> -->
          <button class="cart-decrease" on:click={() => handleUpdateCartItem(item.Id, false)} id="decreaseQuantity">➖</button>
          <button class="cart-increase" on:click={() => handleUpdateCartItem(item.Id, true)} id="increaseQuantity">➕</button>
        </div>
      </li>
    {/each}
  </ul>
</div>