<script>
  import { onMount } from "svelte";
  import { getParam } from "../utils.mjs";
  import { loginRequest } from "../externalServices.mjs";
  import { alertMessage, getLocalStorage, setLocalStorage } from "../utils.mjs";

  let email = "";
  let password = "";
  let formValid = false;
  const tokenKey = "so-token";

  const validateForm = () => {
    formValid = email.trim() !== "" && password.trim() !== "";
    console.log("Form validation status:", formValid);
  };

  const login = async (creds, redirect = "/") => {
    try {
      console.log("Login attempt with credentials:", creds);
      const token = await loginRequest(creds);
      setLocalStorage(tokenKey, token);
      console.log("Login successful, token stored:", token);
      window.location = redirect;
    } catch (err) {
    console.error("Login error:", err);
    let errorMessage = "An error occurred during login.";
    if (err.message && typeof err.message === 'object') {
      errorMessage = err.message.message || err.message.status;
    } else if (err.message) {
      errorMessage = err.message;
    }
    document.getElementById("loginErrorMessage").innerText = errorMessage;
  }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateForm();
    if (formValid) {
      const redirect = getParam("redirect");
      console.log("Form is valid. Submitting login form with redirect:", redirect);
      login({ email, password }, redirect);
    } else {
      console.warn("Form is invalid. Cannot submit.");
    }
  };

  onMount(() => {
    const loginForm = document.getElementById("loginForm");
    const loginButton = document.getElementById("loginButton");

    loginForm.addEventListener("input", () => {
      validateForm();
      loginButton.disabled = !formValid;
    });

    loginForm.addEventListener("submit", handleSubmit);
  });
</script>

<form id="loginForm" class="login-form">
  <fieldset>
    <legend>Login</legend>
    <label for="email">
      email:
      <input type="text" id="email" bind:value={email} required />
    </label>
    <label for="password">
      Password:
      <input type="password" id="password" bind:value={password} required />
    </label>
    <button id="loginButton" type="submit" disabled={!formValid}>Submit</button>
  </fieldset>
  <div id="loginErrorMessage" class="error-message"></div>
</form>

<style>
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .error-message {
    color: red;
  }
</style>
