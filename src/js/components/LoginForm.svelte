<script>
  import { getParam } from "../utils.mjs";
  import { loginRequest } from "../externalServices.mjs";
  import { alertMessage, getLocalStorage, setLocalStorage } from "../utils.mjs";

  const tokenKey = "so-token";

  let email = "";
  let password = "";
  let formValid = false;
  let errorMessage = "";

  const validateForm = () => {
    formValid = email.trim() !== "" && password.trim() !== "";
    console.log("Form valid:", formValid);
  };

  const login = async (creds, redirect = "/orders/index.html") => {
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
    const redirect = getParam("redirect");
    login({ email, password }, redirect);
  };
</script>

<form on:submit={handleSubmit}>
  <fieldset>
    <legend>Login</legend>
    <label for="email">
      email:
      <input
        type="text"
        id="email"
        bind:value={email}
        on:input={validateForm}
        required
      />
    </label>
    <label for="password">
      Password:
      <input
        type="password"
        id="password"
        bind:value={password}
        on:input={validateForm}
        required
      />
    </label>
    <button id="loginButton" type="submit" disabled={!formValid}>Submit</button>
  </fieldset>
  <br>
</form>

{#if errorMessage}
  <p class="error-message">{errorMessage}</p>
{/if}

<style>
  form {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }

  fieldset {
    border: none;
    padding: 0;
    margin: 0;
  }

  legend {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  label {
    display: block;
    margin-bottom: 10px;
  }

  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 8px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  button {
    display: block;
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    background-color: #525b0f;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 1rem;
  }

  button:disabled {
    background-color: #7e69698c;
    cursor: not-allowed;
    color: black;
  }

  .error-message {
    color: red;
    margin-top: 10px;
    background: antiquewhite;
    padding: 18px;
    border-radius: 5px;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    font-family: "Times New Roman", Times, serif;
    /* float: left;  */
    width: 50%; 
    margin-left: 25%;
    margin-right: 25%;
    margin-bottom: 90px;
  }
</style>