import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { DashboardProvider } from "./lib/context/DashboardContext";
import { ConfirmationProvider } from "./lib/context/ConfirmationContext";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <ConfirmationProvider>
      <DashboardProvider>
        <App />
      </DashboardProvider>
    </ConfirmationProvider>
  </Provider>
  // </StrictMode>
);
