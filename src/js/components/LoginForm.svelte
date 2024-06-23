<script>
  import { getParam } from "../utils.mjs";
  import { loginRequest } from "../externalServices.mjs";
  import { alertMessage, getLocalStorage, setLocalStorage } from "../utils.mjs";

  const tokenKey = "so-token";

  let username = "";
  let password = "";
  let formValid = false;
  let errorMessage = "";

  const validateForm = () => {
    formValid = username.trim() !== "" && password.trim() !== "";
    console.log("Form valid:", formValid);
  };

  async function login(creds, redirect = "/") {
    console.log("Attempting login for username:", creds.username);

    try {
      const token = await loginRequest(creds);
      setLocalStorage(tokenKey, token);
      alertMessage(["Login successful. Redirecting..."], true);
      window.location = redirect;      
    } catch (err) {
      console.error("Login error:", err);
      errorMessage = "An error occurred during login.";
      if (err.message && typeof err.message === 'object') {
        errorMessage = err.message.message || err.message.status;
      } else if (err.message) {
        errorMessage = err.message;
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const redirect = getParam("redirect");
    login({ username, password }, redirect);
  };
</script>

<form on:submit={handleSubmit}>
  <fieldset>
    <legend>Login</legend>
    <label for="username">
      Username:
      <input
        type="text"
        id="username"
        bind:value={username}
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