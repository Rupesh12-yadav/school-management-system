import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Home from "./page/Homepage/Home";
import Dashboard from "./page/Student/Dashboard";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null); // user state: null ya {role, email}

  return (
    <div>
      {/* Navbar me login button click hone par popup open hoga */}
      <Navbar onLoginClick={() => setShowLogin(true)} />

      {/* Conditional Rendering */}
      {!user && !showLogin && <Home />} 

      {showLogin && !user && (
        <Login goBack={() => setShowLogin(false)} setUser={setUser} />

      )}

      {/* Role-based Dashboard */}
      {user && user.role === "student" && <Dashboard/>}
      {/* Future me teacher/admin dashboard bhi add kar sakte ho */}
    </div>
  );
};

export default App;
