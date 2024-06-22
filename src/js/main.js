import { loadHeaderFooter } from "./utils.mjs";
import loadAlerts from "./alerts.mjs";
import LoginForm from "./components/LoginForm.svelte";

loadHeaderFooter();
loadAlerts("alert-container");
document.addEventListener("DOMContentLoaded", () => {
  new LoginForm({
    target: document.getElementById("main-header")
  });
});
