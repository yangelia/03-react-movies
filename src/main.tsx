import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "modern-normalize/modern-normalize.css";

import "./index.css";
import App from "./components/App/App";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <App />
      <Toaster position="top-right" />
    </>
  </StrictMode>
);
