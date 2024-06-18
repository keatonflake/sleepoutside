<script>
  import { onMount } from 'svelte';
  import { getLocalStorage, getCartTotal, getCartCount, getDiscountedPrice, alertMessage, setLocalStorage } from "../utils.mjs";
  import { checkout } from "../externalServices.mjs";

  let fName, lName, street, city, state, zip, cardNumber, expiration, code;
  let formValid = true;
  let tax = 0;
  let shipping = 0;
  let total = 0;
  let list = [];

  const validateForm = () => {
    formValid =
      fName &&
      lName &&
      street &&
      city &&
      state &&
      zip &&
      cardNumber &&
      expiration &&
      code;
  };

  const calculateTaxAndShipping = () => {
    const itemSubtotal = parseFloat(getCartTotal()) || 0;
    const itemCount = parseInt(getCartCount(), 10) || 0;

    tax = itemSubtotal * 0.06;
    shipping = 10 + (itemCount > 1 ? (itemCount - 1) * 2 : 0);
    total = itemSubtotal + tax + shipping;
  };

  const packageItems = (items) => {
    return items.map((item) => ({
      id: item.Brand.Id,
      name: item.Brand.Name,
      price: item.FinalPrice,
      quantity: item.Quantity,
    }));
  };

  // Function to format the expiration date as "MM/YY"
  const formatExpirationDate = (date) => {
    const [year, month] = date.split('-');
    return `${month}/${year.slice(2)}`;
  };

  // Initial setup
  const init = () => {
    console.log("Initializing checkout was called...");
    list = getLocalStorage("so-cart") || [];
    console.log("Retrieved list from localStorage:", list);
    calculateTaxAndShipping();
    validateForm();
  };

  const handleSubmit = async (event) => {
  event.preventDefault();
  if (formValid) {
    const orderDate = new Date().toISOString();
    const items = packageItems(getLocalStorage("so-cart") || []);

    const order = {
      orderDate,
      fname: fName,
      lname: lName,
      street,
      city,
      state,
      zip,
      cardNumber,
      expiration: formatExpirationDate(expiration),
      code,
      items,
      orderTotal: total.toFixed(2),
      shipping,
      tax: tax.toFixed(2),
    };

    console.log(order); // Log the order object to the console for verification

    try {
      const response = await checkout(order);
      console.log("Response from checkout:", response);
      if (response.message === "Order Placed") {
        alertMessage(["Thank you for your order! Redirecting to success page..."], true, 5000);
        setLocalStorage("so-cart", []); // Clear the cart
        setTimeout(() => {
          window.location.href = 'success.html';
        }, 3000);
      } else {
        alertMessage([response.message], true);
      }
    } catch (err) {
      console.error("Error during checkout:", err);
      const errorMessages = [];

      if (err.name === "servicesError" && err.message) {
        if (err.message.expiration) {
          errorMessages.push("Error during checkout: Card expired");
        }
        if (err.message.cardNumber) {
          errorMessages.push(`Error during checkout: ${err.message.cardNumber}`);
        }
        if (!err.message.expiration && !err.message.cardNumber) {
          errorMessages.push(`Error during checkout: ${err.message}`);
        }
      } else {
        errorMessages.push(`An error occurred during checkout: ${err.message || "Unknown error"}`);
      }

      alertMessage(errorMessages, true);
    }
  } else {
    alertMessage(["Please fill out all fields."], true);
  }
};

  // Recalculate tax and shipping whenever zip code or cart details change
  $: if (zip) calculateTaxAndShipping();

  // Call init on component mount
  onMount(() => {
    init();
  });
</script>

<form on:submit={handleSubmit} class="checkout-form">
  <fieldset>
    <legend>Shipping</legend>
    <label for="fName">
      First Name:
      <input type="text" bind:value={fName} on:input={validateForm} required />
    </label>
    <label for="lName">
      Last Name:
      <input type="text" bind:value={lName} on:input={validateForm} required />
    </label>
    <label for="street">
      Street:
      <input type="text" bind:value={street} on:input={validateForm} required />
    </label>
    <label for="city">
      City:
      <input type="text" bind:value={city} on:input={validateForm} required />
    </label>
    <label for="state">
      State:
      <input type="text" bind:value={state} on:input={validateForm} required />
    </label>
    <label for="zip">
      Zip:
      <input type="text" bind:value={zip} on:input={validateForm} required />
    </label>
  </fieldset>

  <fieldset>
    <legend>Payment</legend>
    <label for="cardNumber">
      Card Number:
      <input
        type="text"
        bind:value={cardNumber}
        on:input={validateForm}
        placeholder="No spaces or dashes!"
        maxlength="16"
        minlength="16"
        required
      />
    </label>
    <label for="expiration">
      Expiration:
      <input
        type="date"
        bind:value={expiration}
        on:input={validateForm}
        placeholder="mm/yy"
        required
      />
    </label>
    <label for="code">
      Security Code:
      <input type="text" bind:value={code} on:input={validateForm} 
      placeholder="xxx" maxlength="3" minlength="3"
      required />
    </label>
  </fieldset>

  <fieldset>
    <legend>Order Summary</legend>
    {#each list as item}
    <p>
      <!-- {item?.Quantity || 0} x  {(item?.Name || 'Item Name').split(' - ')[0]} — ${(getDiscountedPrice(item)?.finalPrice * (item?.Quantity || 0)).toFixed(2)} -->
      {item?.Quantity || 0} x  {(item?.Name || 'Item Name').split(' - ')[0]} 
    </p>
  {/each}
  <hr>
  <br>
    <p>Item Subtotal: ${parseFloat(getCartTotal()).toFixed(2)}</p>
    <p>Shipping: ${shipping.toFixed(2)}</p>
    <p>Tax: ${tax.toFixed(2)}</p>
    <hr>
    <p><b>Total: ${total.toFixed(2)}</b></p>
    <hr>
    <hr>
  </fieldset>

  <button type="submit" disabled={!formValid}>Submit</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    width: 455px;
    margin: auto;
    border: 1px solid #ccc;
    padding: 20px;
  }

  fieldset {
    margin-bottom: 20px;
    border: 1px solid #ccc;
    padding: 10px;
  }

  legend {
    font-weight: bold;
    padding: 0 5px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    margin-bottom: 10px;
    padding: 8px;
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;
  }

  button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }

  button:disabled {
    background-color: #ccc;
  }


</style>
