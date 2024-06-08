import CheckoutForm from "./components/CheckoutForm.svelte";
import { loadHeaderFooter } from "../js/utils.mjs";
import { checkout } from "./externalServices.mjs";

loadHeaderFooter();

const app = new CheckoutForm({
  target: document.querySelector(".checkout"),
  props: {
    key: "cartItems",
  },
});

app.$on("submit", async (event) => {
  const orderData = event.detail;

  try {
    const result = await checkout(orderData);
    console.log("Order submitted successfully:", result);
    window.location.href = "./checkout/checkout.html"; // Redirect to checkout.html
    console.log("Request Body:", orderData);
  } catch (error) {
    console.error("Error submitting order:", error);
  }
});
