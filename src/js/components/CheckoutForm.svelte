<script>
  import { getLocalStorage, getCartTotal, getCartCount } from "../utils.mjs";
  import { checkout } from "../externalServices.mjs";

  let fName = "";
  let lName = "";
  let street = "";
  let city = "";
  let state = "";
  let zip = "";
  let cardNumber = "";
  let expiration = "";
  let code = "";
  let formValid = false;
  let tax = 0;
  let shipping = 0;
  let total = 0;

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
        expiration,
        code: code,
        items,
        orderTotal: total.toFixed(2),
        shipping: shipping,
        tax: tax.toFixed(2),
      };

      console.log(order); // Log the order object to the console for verification

      const response = await checkout(order);
      console.log("Response from checkout:", response);
      if (response.message === "Order Placed") {
        alert(
            `Thank you for your order!
            ${response.message}
            Your order number is: ${response.orderId}
            `);
      } else {
        alert(response.message);
      }
    } else {
      alert("Please fill out all fields.");
    }
  };

  // Recalculate tax and shipping whenever zip code or cart details change
  $: if (zip) calculateTaxAndShipping();
</script>

<form on:submit={handleSubmit}>
  <fieldset>
    <legend>Shipping</legend>
    <label>
      First Name:
      <input type="text" bind:value={fName} on:input={validateForm} required />
    </label>
    <label>
      Last Name:
      <input type="text" bind:value={lName} on:input={validateForm} required />
    </label>
    <label>
      Street:
      <input type="text" bind:value={street} on:input={validateForm} required />
    </label>
    <label>
      City:
      <input type="text" bind:value={city} on:input={validateForm} required />
    </label>
    <label>
      State:
      <input type="text" bind:value={state} on:input={validateForm} required />
    </label>
    <label>
      Zip:
      <input type="text" bind:value={zip} on:input={validateForm} required />
    </label>
  </fieldset>

  <fieldset>
    <legend>Payment</legend>
    <label>
      Card Number:
      <input
        type="text"
        bind:value={cardNumber}
        on:input={validateForm}
        required
      />
    </label>
    <label>
      Expiration:
      <input
        type="text"
        bind:value={expiration}
        on:input={validateForm}
        required
      />
    </label>
    <label>
      Security Code:
      <input type="text" bind:value={code} on:input={validateForm} required />
    </label>
  </fieldset>

  <fieldset>
    <legend>Order Summary</legend>
    <p>Item Subtotal: ${parseFloat(getCartTotal()).toFixed(2)}</p>
    <p>Shipping: ${shipping.toFixed(2)}</p>
    <p>Tax: ${tax.toFixed(2)}</p>
    <p>Total: ${total.toFixed(2)}</p>
  </fieldset>

  <button type="submit" disabled={!formValid}>Submit</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    width: 300px;
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
