import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppOs from "main/AppOs";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AppOs />
  </StrictMode>
);
