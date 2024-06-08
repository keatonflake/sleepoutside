import CheckoutForm from "./components/CheckoutForm.svelte";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

new CheckoutForm({
    target: document.querySelector(".products"),
});
