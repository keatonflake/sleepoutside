import { login } from "../js/auth.mjs";
import { loadHeaderFooter, getParam } from "../js/utils.mjs";
import LoginForm from "../js/components/LoginForm.svelte";

new LoginForm({
    target: document.querySelector(".login-form"),
  });
  
loadHeaderFooter();

const redirect = getParam("redirect");

document.querySelector("#loginButton").addEventListener("click", (e) => {
  const email = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  login({ email, password }, redirect);
});