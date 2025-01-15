import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import App from "./components/app";
import { Provider } from "./components/ui/provider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <Router hook={useHashLocation}>
        <App />
      </Router>
    </Provider>
  </StrictMode>,
);
