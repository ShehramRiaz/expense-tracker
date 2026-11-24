import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";

import TransactionProvider from "./context/TransactionProvider";

import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <TransactionProvider>
        <App />
      </TransactionProvider>
    </HashRouter>
  </StrictMode>,
);
