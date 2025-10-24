import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import  AuthProvider  from "./context/authContext.jsx"; // 👈 Import AuthProvider
import './index.css';
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 👇 Wrap the entire app */}
    
    <AuthProvider>
      {/* <ChakraProvider> */}
      <App />
      {/* </ChakraProvider> */}
    </AuthProvider>
  </React.StrictMode>
);
