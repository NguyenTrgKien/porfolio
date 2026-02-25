import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeProvider from "./contexts/ThemeContext.tsx";
import { ToastContainer, Bounce } from "react-toastify";
import { DeviceProvider } from "./contexts/DeviceContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <DeviceProvider>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        ></ToastContainer>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </DeviceProvider>
    </Router>
  </StrictMode>,
);
