import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <BrowserRouter
        future={{
          v7_startTransition: true,
        }}
      >
        <App />
      </BrowserRouter>
    </StyledEngineProvider>
  </StrictMode>
);
