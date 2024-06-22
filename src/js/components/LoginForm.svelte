<script>
  import { getParam } from "../utils.mjs";
  import { loginRequest } from "../externalServices.mjs";
  import { alertMessage, getLocalStorage, setLocalStorage } from "../utils.mjs";

  const tokenKey = "so-token";

  let username = "user1@email.com";
  let password = "user1";
  let formValid = false;

  const validateForm = () => {
    formValid = username.trim() !== "" && password.trim() !== "";
  };

  export async function login(creds, redirect = "/") {
    try {
      const token = await loginRequest(creds);
      setLocalStorage(tokenKey, token);
      // because of the default arg provided above...if no redirect is provided send them Home.
      window.location = redirect;
    } catch (err) {
      alertMessage(err.message.message);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const redirect = getParam("redirect");
    login(username, password, redirect);
  };
</script>

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
  <button id="loginButton" type="submit" disabled={!formValid} on:click={handleSubmit}
    >Submit</button
  >
</fieldset>
