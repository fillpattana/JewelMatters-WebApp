import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import "react-datepicker/dist/react-datepicker.css";
import { RoleProvider } from "./react-contexts/RoleContexts.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RoleProvider>
      <App />
    </RoleProvider>
  </React.StrictMode>
);
