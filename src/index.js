import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "./styles/globals.css";

// import { HealthCareProvider } from "../Context/healthCareContext";
import { HealthCareProvider } from "./Context/HealthCareContext";
// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mumbai;

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <HealthCareProvider>
      <ThirdwebProvider desiredChainId={activeChainId}>
        <Router>
          <App />
        </Router>
      </ThirdwebProvider>
    </HealthCareProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
