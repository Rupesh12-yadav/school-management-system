import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import  AuthProvider  from "./context/authContext.jsx"; // 👈 Import AuthProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 👇 Wrap the entire app */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
