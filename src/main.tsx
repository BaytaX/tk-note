import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/styles.css";
import "./assets/App.css";
import { StrictMode } from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
