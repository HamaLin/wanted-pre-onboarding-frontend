import React from "react";
import ReactDOM from "react-dom/client";
import { SnackbarProvider } from "notistack";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);
