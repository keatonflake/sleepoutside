<script>
    import { getLocalStorage } from "../utils.mjs";
    const cartItems = getLocalStorage("so-cart") || [];
  </script>
  
  <h2>Shopping Cart</h2>
  
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
          <button class="cart-remove" onclick="removeFromCart(${item.Id})">Remove</button> 
          <button class="cart-decrease" onclick="updateQuantity(${item.Id}, 'decrease')">➖</button>
          <button class="cart-increase" onclick="updateQuantity(${item.Id}, 'increase')">➕</button>
        </div>
      </li>
    {/each}
  </ul>
</div>