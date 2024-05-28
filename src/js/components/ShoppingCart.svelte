<script>
  import { cartCount } from "../stores.mjs";
    import { getLocalStorage, decrement  } from "../utils.mjs";
    // import { Cartcount } from './stores.js';

const cartItems = getLocalStorage("so-cart") || [];

// this function is to find the product Id in the cart and decrement the quantity 
// from the cart and cartCount
   
// function handleDecrement(id){
// const existingProductIndex = currentProducts.findIndex(product => product.id === newProduct.id);

// // decriment the quantity

// decrement(id);
// }
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
        <p class="cart-card__quantity blue"> Quantity: {item.Quantity}</p>
        <p class="cart-card__price blue">${(item.ListPrice * item.Quantity).toFixed(2)}</p>
          <div class="cart-card__buttons">
            <!-- <button class="cart-remove" onclick={remove(item.Id)} id="removeFromCart">Remove</button> -->

            <!-- pending handleDecrement function to call increment  -->
            <!-- <button class="cart-decrease" onclick={handleDecrement(item.Id)} id="decreaseQuantity">➖</button> -->

            <button class="cart-decrease" onclick={decrement(item.Id)} id="decreaseQuantity">➖</button>

            <!-- <button class="cart-increase" onclick={increment(item.Id)} id="increaseQuantity">➕</button> -->
          </div>
      </li>
    {/each}
  </ul>
</div>

