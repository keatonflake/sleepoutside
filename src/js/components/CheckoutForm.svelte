<script>
  import { createEventDispatcher } from "svelte";
  import { getLocalStorage, getDiscountedPrice } from "../utils.mjs";


  // State variables
  let list = [];
  let itemTotal = 0;
  let shipping = 0;
  let tax = 0;
  let orderTotal = 0;

  let fname = "";
  let lname = "";
  let street = "";
  let city = "";
  let state = "";
  let zip = "";
  let cardNumber = "";
  let expiration = "";
  let code = "";

  const dispatch = createEventDispatcher();

  // Initial setup
  const init = function () {
    console.log("Initializing checkout was called...");
    list = getLocalStorage("so-cart") || [];
    console.log("Retrieved list from localStorage:", list);
    calculateItemSummary();
    calculateOrderTotal();
  };

  // Calculate order subtotal from the cart items
  const calculateItemSummary = function () {
  itemTotal = list.reduce((sum, item) => {
    const discountedPrice = getDiscountedPrice(item).finalPrice;
    const itemQuantity = item.Quantity || 1; // Use Quantity property
    return sum + (discountedPrice * itemQuantity);
  }, 0);
  console.log("Calculated itemTotal:", itemTotal);
};
  // Calculate shipping, tax, and orderTotal
  const calculateOrderTotal = function () {
    const itemCount = list.reduce((count, item) => count + (item.quantity || 1), 0);
    console.log("Calculated itemCount:", itemCount);
    shipping = 10 + (itemCount - 1) * 2; // $10 for the first item, $2 for each additional item
    tax = itemTotal * 0.06; // 6% sales tax
    orderTotal = itemTotal + shipping + tax;
    console.log("Calculated shipping:", shipping);
    console.log("Calculated tax:", tax);
    console.log("Calculated orderTotal:", orderTotal);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const orderData = {
      orderDate: new Date().toISOString(),
      fname,
      lname,
      street,
      city,
      state,
      zip,
      cardNumber,
      expiration,
      code,
      items: list.map(item => ({
        id: item.Id,
        name: item.Name ,
        price: item.FinalPrice,
        quantity: item.Quantity || 1
      })),
      itemTotal: itemTotal.toFixed(2),
      shipping: shipping.toFixed(2),
      tax: tax.toFixed(2),
      orderTotal: orderTotal.toFixed(2)
    };
    console.log("Order data to be dispatched:", orderData);
    dispatch("submit", orderData);
  }

  // Watch zip code change to recalculate order total
  $: if (zip) {
    console.log("Zip code changed:", zip);
    calculateOrderTotal();
  }

  // Initial setup
  init();
</script>

<style>
  form {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }

  fieldset {
    border: none;
    margin-bottom: 20px;
  }

  legend {
    font-weight: bold;
    margin-bottom: 10px;
  }

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    font-weight: bold;
  }

  input {
    margin-top: 5px;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
  }

  button {
    padding: 10px 20px;
    margin-top: 20px;
    font-size: 16px;
    color: var( --dark-grey);
    background-color: var(--primary-color);
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: var(--secondary-color);
    color: #f1f1f1;
  }

  .checkout-summary {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    background-color: #f1f1f1;
  }

  .checkout-summary p {
    margin: 5px 0;
  }

  /* .checkout-summary p span {
    font-weight: bold;
  } */
</style>


<form on:submit={handleSubmit}>
  <fieldset>
    <legend>Shipping</legend>
    <label for="fname">First Name: <input type="text" bind:value={fname} id="fname" required></label>
    <label for="lname">Last Name: <input type="text" bind:value={lname} id="lname" required></label>
    <label for="street">Street: <input type="text" bind:value={street} id="street" required></label>
    <label for="city">City: <input type="text" bind:value={city} id="city" required></label>
    <label for="state">State: <input type="text" bind:value={state} id="state" required></label>
    <label for="zip">Zip: <input type="number" bind:value={zip} id="zip" required></label>
  </fieldset>

  <fieldset>
    <legend>Payment</legend>
    <label for="cardNumber">Card Number:
      <input type="number" bind:value={cardNumber}  id="cardNumber" placeholder="No spaces or dashes 16 digits!"   maxlength="16" minlength="16" required>
    </label>
    <label for="expiration">Expiration: 
      <input type="text" id="expiration" bind:value={expiration} placeholder="mm/yy" required>
    </label>    
    <label for="code">Security Code: <input type="number" bind:value={code} id="code" placeholder="xxx" maxlength="3" minlength="3" required>
    </label>
  </fieldset>

  <fieldset class="checkout-summary">
    <legend>Order Summary</legend>
    <p>Order Detail</p>
    <br>
    {#each list as item}
      <p>
        {item?.Quantity || 0} x  {(item?.Name || 'Item Name').split(' - ')[0]} — ${(getDiscountedPrice(item)?.finalPrice * (item?.Quantity || 0)).toFixed(2)}
      </p>
    {/each}
    <br>
    <p>Item Subtotal: ${itemTotal.toFixed(2)}</p>
    <p>Shipping Estimate: ${shipping.toFixed(2)}</p> 
    <p>Tax: ${tax.toFixed(2)}</p>
    <hr>
    <p>Total: ${orderTotal.toFixed(2)}</p>
    <hr>
  </fieldset>

  <button type="submit">Checkout</button>
</form>
