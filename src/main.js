import "./app.scss";
import App from "./App.svelte";
import "/styles.scss";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
